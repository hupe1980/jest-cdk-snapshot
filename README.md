# jest-cdk-snapshot

[![Build Status](https://github.com/hupe1980/jest-cdk-snapshot/workflows/Build/badge.svg)](https://github.com/hupe1980/jest-cdk-snapshot/workflows/Build/badge.svg)

> Jest matcher for cdk cloudformation comparisons.

## Install

```bash
npm i -D jest-cdk-snapshot
```

## How to use

Note that this targets of CDK v2. If you are still using v1 you must use v1 of this library.

```typescript
import { Stack } from 'aws-cdk-lib/core';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();

  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot();
});
```

## Ignore Assets

```typescript
import * as path from 'path';
import { Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

test('ignore assets', () => {
  const stack = new Stack();
  
  new Function(stack, 'Function', {
    code: Code.fromAsset(path.join(__dirname, 'fixtures', 'lambda')),
    runtime: Runtime.NODEJS_12_X,
    handler: 'index.handler'
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

```

## Ignore CurrentVersions

With this enabled, hash-parts in Lambda's current version and in their references get masked.
So the snapshot test will not fail if the hash changes.
This is handy when you have concurrent pull requests that change hash.

```typescript
import * as path from 'path';
import { Stack } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

test('ignore current version', () => {
  const stack = new Stack();
  
  new Function(stack, 'Function', {
    code: Code.fromAsset(path.join(__dirname, 'fixtures', 'lambda')),
    runtime: Runtime.NODEJS_12_X,
    handler: 'index.handler'
  });

  expect(stack).toMatchCdkSnapshot({
      ignoreCurrentVersion: true,
  });
});
```

## Use YAML as snapshot format

```typescript
import { Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({ yaml: true });
});
```

## Show CDK bootstrap versions

CDK v2 includes bootstrap versions in CloudFormation template.
These fields are generally not interesting, so ignored by default.
To include these fields in snapshots, set `ignoreBootstrapVersion: false` explicitly.

```typescript
import { Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({ ignoreBootstrapVersion: false });
});
```

## Match only resources of given types/keys

If you only want to test certain parts of your stack, jest-cdk-snapshot offers the possibility to create a subset for specific types. Snapshots are created only for this subset.

```typescript
import { Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Topic } from 'aws-cdk-lib/aws-sns';
import 'jest-cdk-snapshot';

test('subsetResourceTypes', () => {
  const stack = new Stack();
  new Bucket(stack, 'Ignore');

  new Topic(stack, 'Topic');

  expect(stack).toMatchCdkSnapshot({
    subsetResourceTypes: ['AWS::SNS::Topic']
  });
});

test('subsetResourceKeys', () => {
  const stack = new Stack();
  new Bucket(stack, 'Ignore');

  new Topic(stack, 'Topic'); // => TopicBFC7AF6E

  expect(stack).toMatchCdkSnapshot({
    subsetResourceKeys: ['TopicBFC7AF6E'],
  });
});
```

### PropertyMatchers

Often there are fields in the stack you want to snapshot which are generated (like Artifact hashes). If you try to snapshot these stacks, they will force the snapshot to fail on every run. For these cases, jest-cdk-snapshot allows providing an asymmetric matcher for any property. These matchers are checked before the snapshot is written or tested, and then saved to the snapshot file instead of the received value. Any given value that is not a matcher will be checked exactly and saved to the snapshot:

```typescript
import { Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
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

## Ignore Metadata

With this enabled CloudFormation metadata both on Stack and Resource level will be ignored.
Metadata is often added by Aspects or other libraries.

```typescript
import { Stack } from 'aws-cdk-lib/core';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();

  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({
    ignoreMetadata: true,
  });
});
```

## Ignore Resource Tags

With this enabled, tags on all resources that have tags configured are ignored.
This can be useful in situations where tags contain changing informatione like the commit or a pipeline id.

```typescript
  expect(stack).toMatchCdkSnapshot({
    ignoreTags: true,
  });
```

## License

[MIT](LICENSE)
