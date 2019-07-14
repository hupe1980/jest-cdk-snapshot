import { ConstructNode, Stack, SynthesisOptions } from '@aws-cdk/core';
import { toMatchSnapshot } from 'jest-snapshot';

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchCdkSnapshot(): R;
    }
  }
}

export const toMatchCdkSnapshot = function(
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
