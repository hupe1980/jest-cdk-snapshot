# jest-cdk-snapshot

> Jest matcher for cdk cloudformation comparisons.

## Install

```bash
npm install --save-dev jest-cdk-snapshot
```

## How to use

```javascript
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

```javascript
import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const stack = new Stack();
  new Bucket(stack, 'Foo');

  expect(stack).toMatchCdkSnapshot({ yaml: true });
});
```

## License

[MIT](LICENSE)
