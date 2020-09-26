import * as cdk from '@aws-cdk/core';
import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration, IResource, MockIntegration, PassthroughBehavior } from "@aws-cdk/aws-apigateway";
import { RetentionDays } from '@aws-cdk/aws-logs';

//**************************************************** */
// 変数部分は自由に編集してください。
const yourFunctionName = 'your-function';
const restApiName = 'your-first-api';
//**************************************************** */

export class AwsCdkCreateApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //**************************************************** */
    //LambdaFunctionの作成
    //**************************************************** */
    const yourFunction: Function = new Function(this, 'your-function-id', {
      functionName: yourFunctionName,
      runtime: Runtime.NODEJS_12_X,
      code: AssetCode.fromAsset('src/lambda'),
      handler: 'yourFunction.handler',
      timeout: cdk.Duration.seconds(10),
      environment: {
        TZ: "Asia/Tokyo",
        CORS_URL: "*" // 作成したCloudFrontのエンドポイントを指定する
      },
      logRetention: RetentionDays.TWO_MONTHS,
    });

    //**************************************************** */
    // API Gateway（リソース, メソッド）の作成
    //**************************************************** */
    const api = new RestApi(this, "your-first-api-id", {
      restApiName: restApiName,
      cloudWatchRole: true,

    });
    const scanMeeting = api.root.addResource("your-du");

    const scanMeetingLambdaIntegration = new LambdaIntegration(yourFunction);
    scanMeeting.addMethod("POST", scanMeetingLambdaIntegration);
    addCorsOptions(scanMeeting);
  }
}

//**************************************************** */
// API GatewayのメソッドにOPTIONを追加
//**************************************************** */
export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod(
    "OPTIONS",
    new MockIntegration({
      integrationResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
            "method.response.header.Access-Control-Allow-Origin": "'*'",
            "method.response.header.Access-Control-Allow-Credentials": "'false'",
            "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE'",
          },
        },
      ],
      passthroughBehavior: PassthroughBehavior.NEVER,
      requestTemplates: {
        "application/json": '{"statusCode": 200}',
      },
    }),
    {
      methodResponses: [
        {
          statusCode: "200",
          responseParameters: {
            "method.response.header.Access-Control-Allow-Headers": true,
            "method.response.header.Access-Control-Allow-Methods": true,
            "method.response.header.Access-Control-Allow-Credentials": true,
            "method.response.header.Access-Control-Allow-Origin": true,
          },
        },
      ],
    }
  );
}
