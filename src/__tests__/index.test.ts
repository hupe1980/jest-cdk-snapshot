import { CfnOutput, CfnParameter, Stack } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { AccountPrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Topic } from "aws-cdk-lib/aws-sns";
import * as path from "path";
import "../index";

test("default setup", () => {
  const stack = new Stack();
  new Bucket(stack, "Foo");

  expect(stack).toMatchCdkSnapshot();
});

test("multiple resources", () => {
  const stack = new Stack();
  new Bucket(stack, "Foo");

  new Bucket(stack, "Bar");

  expect(stack).toMatchCdkSnapshot();
});

test("yaml setup", () => {
  const stack = new Stack();
  new Bucket(stack, "Foo");

  expect(stack).toMatchCdkSnapshot({ yaml: true });
});

test("subsetResourceTypes", () => {
  const stack = new Stack();
  new Bucket(stack, "Ignore");

  new Topic(stack, "Topic");

  expect(stack).toMatchCdkSnapshot({
    subsetResourceTypes: ["AWS::SNS::Topic"],
  });
});

test("subsetResourceKeys", () => {
  const stack = new Stack();
  new Bucket(stack, "Ignore");

  new Topic(stack, "Topic");

  expect(stack).toMatchCdkSnapshot({
    subsetResourceKeys: ["TopicBFC7AF6E"],
  });
});

test("propertyMatchers", () => {
  const stack = new Stack();
  new Bucket(stack, "Random", {
    websiteIndexDocument: "test.html",
    bucketName: `random${Math.floor(Math.random() * 20)}name`,
  });

  expect(stack).toMatchCdkSnapshot({
    propertyMatchers: {
      Resources: {
        RandomF1C596BC: {
          Properties: {
            BucketName: expect.any(String),
            WebsiteConfiguration: {
              IndexDocument: "test.html",
            },
          },
        },
      },
    },
  });
});

test("ignore assets", () => {
  const stack = new Stack();

  new Function(stack, "Function", {
    code: Code.fromAsset(path.join(__dirname, "fixtures", "lambda")),
    runtime: Runtime.NODEJS_12_X,
    handler: "index.handler",
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test("ignore assets without resources", () => {
  const stack = new Stack();

  new CfnParameter(stack, "Param");

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});

test("ignore current version", () => {
  const stack = new Stack();

  const lf = new Function(stack, "Function", {
    code: Code.fromAsset(path.join(__dirname, "fixtures", "lambda")),
    runtime: Runtime.NODEJS_12_X,
    handler: "index.handler",
  });
  lf.currentVersion.grantInvoke(new AccountPrincipal("123456789012"));

  new CfnOutput(stack, "CurrentVersion", {
    value: lf.currentVersion.functionArn,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
    ignoreCurrentVersion: true,
  });
});

test("YAML should support ignoreAssets", () => {
  const stack = new Stack();

  new Function(stack, "Function", {
    code: Code.fromAsset(path.join(__dirname, "fixtures", "lambda")),
    runtime: Runtime.NODEJS_12_X,
    handler: "index.handler",
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
    yaml: true,
  });
});

test("show bootstrap version if ignoreBootstrapVersion is explicitly false", () => {
  const stack = new Stack();

  new CfnParameter(stack, "Param");

  expect(stack).toMatchCdkSnapshot({
    ignoreBootstrapVersion: false,
  });
});
