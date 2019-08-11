import { Stack } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';
import '../index';

test('default setup', () => {
    const stack = new Stack();
    new Bucket(stack, 'Foo');
    
    expect(stack).toMatchCdkSnapshot();
});


