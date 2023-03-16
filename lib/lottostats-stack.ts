import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';

export class LottostatsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const demoHandler = new nodejs.NodejsFunction(this, 'demo-lambda', {
      functionName: 'lottostats-demo-lambda',
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: 'src/lambda.ts',
    });

    const api = new apiGateway.RestApi(this, 'lottostats', {
      restApiName: 'LottoStats',
      description: 'API for LottoStats',
    });

    const demoIntegration = new apiGateway.LambdaIntegration(demoHandler);
    api.root.addMethod('GET', demoIntegration);
  }
}
