import * as path from "path";
import { CfnParameter, Stack } from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { Topic } from "@aws-cdk/aws-sns";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";

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

  new CfnParameter(stack, "Param")

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
