# @cloudcomponents/jest-cdk-snapshot

> Jest matcher for cdk cloudformation comparisons.

## Install

```bash
npm install --save-dev @cloudcomponents/jest-cdk-snapshot
```

## How to use

```javascript
import { Stack } from '@aws-cdk/core';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import '@cloudcomponents/jest-cdk-snapshot';

describe('cdk-github-webhook', () => {
  it('snapshot', () => {
    const stack = new Stack();

    new GithubWebhook(stack, 'GithubWebhook', {
      githubApiToken: 'test12',
      githubRepoUrl: 'test',
      payloadUrl: 'test',
      events: ['test']
    });

    expect(stack).toMatchCdkSnapshot();
  });
});
```

## Use YAML as snaphsot format

```javascript
import { Stack } from '@aws-cdk/core';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';
import '@cloudcomponents/jest-cdk-snapshot';

describe('cdk-github-webhook', () => {
  it('snapshot', () => {
    const stack = new Stack();

    new GithubWebhook(stack, 'GithubWebhook', {
      githubApiToken: 'test12',
      githubRepoUrl: 'test',
      payloadUrl: 'test',
      events: ['test']
    });

    expect(stack).toMatchCdkSnapshot({ yaml: true });
  });
});
```

## License

[MIT](LICENSE)
