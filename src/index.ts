import { ConstructNode, Stack, SynthesisOptions } from '@aws-cdk/core';
import { toMatchSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchCdkSnapshot(): R;
    }
  }
}

const toMatchCdkSnapshot = function(
  this: any,
  received: Stack,
  options: SynthesisOptions = {}
) {
  const matcher = toMatchSnapshot.bind(this);
  return matcher(convertStack(received, options));
};

const convertStack = (stack: Stack, options: SynthesisOptions = {}) => {
  const { root } = stack.node;
  const assembly = ConstructNode.synth(root.node, options);
  
  return assembly.getStack(stack.stackName).template;
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

export {
  toMatchCdkSnapshot,
}
