import { Stack, StackProps, aws_lambda, aws_apigateway } from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const myFunction = new aws_lambda.Function(this, "MyFunction", {
      runtime: aws_lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: aws_lambda.Code.fromAsset(path.join(__dirname, "handler")),
    });

    new aws_apigateway.LambdaRestApi(this, "MyApi", {
      handler: myFunction,
    });
  }
}
