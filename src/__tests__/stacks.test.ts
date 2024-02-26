import { Stack, App } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda";
import "../index";
import path from "path";

describe("Multiple stacks in a single app", () => {
  test("dependent stacks", () => {
    const app = new App();
    const s3Stack = new Stack(app, "S3");
    new Bucket(s3Stack, "Foo");

    const lambdaStack = new Stack(app, "Lambda");
    new Function(lambdaStack, "Bar", {
      code: Code.fromAsset(path.join(__dirname, "fixtures", "lambda")),
      handler: "index.handler",
      runtime: Runtime.NODEJS_20_X,
    });

    expect(s3Stack).toMatchCdkSnapshot();
    expect(lambdaStack).toMatchCdkSnapshot();
  });

  test("one stack referencing the other", () => {
    const app = new App();
    const s3Stack = new Stack(app, "S3");
    const bucket = new Bucket(s3Stack, "Foo");

    const lambdaStack = new Stack(app, "Lambda");
    new Function(lambdaStack, "Bar", {
      code: Code.fromAsset(path.join(__dirname, "fixtures", "lambda")),
      handler: "index.handler",
      runtime: Runtime.NODEJS_20_X,
      environment: {
        bucket: bucket.bucketArn,
      },
    });

    expect(s3Stack).toMatchCdkSnapshot();
    expect(lambdaStack).toMatchCdkSnapshot();
  });
});
