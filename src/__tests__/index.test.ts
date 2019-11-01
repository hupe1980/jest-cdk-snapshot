import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Topic } from '@aws-cdk/aws-sns';

import '../index';

test('default setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot();
});

test('yaml setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({ yaml: true });
});

test('subsetResourceTypes', () => {
  const stack = new Stack();
  new Bucket(stack, 'Ignore');

  new Topic(stack, 'Topic');

  expect(stack).toMatchCdkSnapshot({
    subsetResourceTypes: ['AWS::SNS::Topic']
  });
});
