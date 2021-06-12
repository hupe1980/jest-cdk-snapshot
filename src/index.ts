import { SynthUtils } from "@aws-cdk/assert";
import { Stack, SynthesisOptions } from "@aws-cdk/core";
import { toMatchSnapshot } from "jest-snapshot";
import * as jsYaml from "js-yaml";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toMatchCdkSnapshot(options?: Options): R;
    }
  }
}

const currentVersionRegex = /^(.+CurrentVersion[0-9A-F]{8})[0-9a-f]{32}$/;

type Options = SynthesisOptions & {
  /**
   * Output snapshots in YAML (instead of JSON)
   */
  yaml?: boolean;

  /**
   * Ignore Assets
   */
  ignoreAssets?: boolean;

  /**
   * Ignore Lambda Current Version
   */
  ignoreCurrentVersion?: boolean;

  /**
   * Match only resources of given types
   */
  subsetResourceTypes?: string[];

  /**
   * Match only resources of given keys
   */
  subsetResourceKeys?: string[];

  propertyMatchers?: { [property: string]: unknown };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toMatchCdkSnapshot = function (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  this: any,
  received: Stack,
  options: Options = {}
) {
  const matcher = toMatchSnapshot.bind(this);
  const { propertyMatchers, ...convertOptions } = options;

  const stack = convertStack(received, convertOptions);

  return propertyMatchers ? matcher(stack, propertyMatchers) : matcher(stack);
};

const convertStack = (stack: Stack, options: Options = {}) => {
  const {
    yaml,
    ignoreAssets = false,
    ignoreCurrentVersion = false,
    subsetResourceTypes,
    subsetResourceKeys,
    ...synthOptions
  } = options;

  const template = SynthUtils.toCloudFormation(stack, synthOptions);

  if (ignoreAssets && template.Parameters && template.Resources) {
    template.Parameters = expect.any(Object);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.values(template.Resources).forEach((resource: any) => {
      if (resource?.Properties?.Code) {
        resource.Properties.Code = expect.any(Object);
      }
    });
  }

  if (ignoreCurrentVersion && template.Parameters && template.Resources) {
    template.Parameters = expect.any(Object);
    for (const [key, resource] of Object.entries(template.Resources)) {
      const match = currentVersionRegex.exec(key);
      if (match) {
        const newKey = `${match[1]}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
        template.Resources[newKey] = resource;
        delete template.Resources[key];
      }
    }
  }

  if (subsetResourceTypes && template.Resources) {
    for (const [key, resource] of Object.entries(template.Resources)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!subsetResourceTypes.includes((resource as any).Type)) {
        delete template.Resources[key];
      }
    }
  }

  if (subsetResourceKeys && template.Resources) {
    for (const [key] of Object.entries(template.Resources)) {
      if (!subsetResourceKeys.includes(key)) {
        delete template.Resources[key];
      }
    }
  }

  return yaml ? jsYaml.safeDump(template) : template;
};

if (expect !== undefined) {
  expect.extend({ toMatchCdkSnapshot });
} else {
  console.error(
    "Unable to find Jest's global expect." +
      "\nPlease check you have added jest-cdk-snapshot correctly." +
      "\nSee https://github.com/hupe1980/jest-cdk-snapshot for help."
  );
}
