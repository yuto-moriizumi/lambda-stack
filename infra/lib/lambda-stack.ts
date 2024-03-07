import { Stack, StackProps } from "aws-cdk-lib";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
import path = require("path");

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    dotenv.config({
      path: path.join(__dirname, "..", "..", "api", ".env"),
    });

    const myFunction = new NodejsFunction(this, "MyFunction", {
      runtime: Runtime.NODEJS_20_X,
      handler: "handler",
      entry: path.join(__dirname, "..", "..", "api", "main.ts"),
      environment: {
        TEST_ENV: process.env.TEST_ENV!,
      },
    });

    new HttpApi(this, "MyApi", {
      defaultIntegration: new HttpLambdaIntegration("Integration", myFunction),
    });
  }
}
