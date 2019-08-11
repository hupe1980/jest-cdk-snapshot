import { ConstructNode, Stack, SynthesisOptions } from '@aws-cdk/core';
import { toMatchSnapshot } from 'jest-snapshot';
import * as jsYaml from 'js-yaml'

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchCdkSnapshot(options?: Options): R;
    }
  }
}

type Options = SynthesisOptions & {
  /**
   * Output snapshots in YAML (instead of JSON)
   */
  yaml?: boolean
}

const toMatchCdkSnapshot = function(
  this: any,
  received: Stack,
  options: Options = {}
) {
  const matcher = toMatchSnapshot.bind(this);
  return matcher(convertStack(received, options));
};

const convertStack = (stack: Stack, options: Options = {}) => {
  const { root } = stack.node;
  const { yaml, ...synthOptions } = options

  const assembly = ConstructNode.synth(root.node, synthOptions);
  const template = assembly.getStack(stack.stackName).template;

  return yaml ? jsYaml.safeDump(template) : template
};

if (expect !== undefined) {
  expect.extend({toMatchCdkSnapshot});
} else {
  /* eslint-disable-next-line no-console */
  console.error(
    "Unable to find Jest's global expect." +
    '\nPlease check you have added @cloudcomponents/jest-cdk-snapshot correctly.' +
    '\nSee https://github.com/cloudcomponents/jest-cdk-snapshot for help.'
  );
}
