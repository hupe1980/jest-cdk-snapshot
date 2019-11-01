# jest-cdk-snapshot

[![Build Status](https://travis-ci.org/hupe1980/jest-cdk-snapshot.svg?branch=master)](https://travis-ci.org/hupe1980/jest-cdk-snapshot)

> Jest matcher for cdk cloudformation comparisons.

## Install

```bash
npm i -D jest-cdk-snapshot
```

## How to use

```typescript
import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();

  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot();
});
```

## Use YAML as snapshot format

```typescript
import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({ yaml: true });
});
```

## Match only resources of given types

```typescript
import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import { Topic } from '@aws-cdk/aws-sns';
import 'jest-cdk-snapshot';

test('subsetResourceTypes', () => {
  const stack = new Stack();
  new Bucket(stack, 'Ignore');

  new Topic(stack, 'Topic');

  expect(stack).toMatchCdkSnapshot({
    subsetResourceTypes: ['AWS::SNS::Topic']
  });
});
```

## License

[MIT](LICENSE)
