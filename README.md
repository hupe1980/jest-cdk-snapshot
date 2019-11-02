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

If you only want to test certain parts of your stack, jest-cdk-snapshot offers the possibility to create a subset for specific types. Snapshots are created only for this subset.

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

### PropertyMatchers

Often there are fields in the stack you want to snapshot which are generated (like Artifact hashes). If you try to snapshot these stacks, they will force the snapshot to fail on every run. For these cases, jest-cdk-snapshot allows providing an asymmetric matcher for any property. These matchers are checked before the snapshot is written or tested, and then saved to the snapshot file instead of the received value. Any given value that is not a matcher will be checked exactly and saved to the snapshot:

```typescript
import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import 'jest-cdk-snapshot';

test('propertyMatchers', () => {
  const stack = new Stack();
  new Bucket(stack, 'Random', {
    websiteIndexDocument: 'test.html',
    bucketName: `random${Math.floor(Math.random() * 20)}name`
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Resources: {
        RandomF1C596BC: {
          Properties: {
            BucketName: expect.any(String), // matcher
            WebsiteConfiguration: {
              IndexDocument: 'test.html' // given value
            }
          }
        }
      }
    }
  });
});
```

## License

[MIT](LICENSE)
