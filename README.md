# @cloudcomponents/jest-cdk-snapshot

> Jest matcher for cdk cloudformation comparisons.

## Install

```bash
npm install --save-dev @cloudcomponents/jest-cdk-snapshot
```

## How to use

1. Extend Jest's `expect`

```javascript
import { toMatchCdkSnapshot } from '@cloudcomponents/jest-cdk-snapshot';

expect.extend({ toMatchCdkSnapshot });
```

2. Use `toMatchCdkSnapshot()` in your tests!

```javascript
import { Stack } from '@aws-cdk/core';
import { GithubWebhook } from '@cloudcomponents/cdk-github-webhook';

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
