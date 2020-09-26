# Welcome to CDK TypeScript project for your Prototyping!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js // cdk-templete-startup-edition-stack.tsを編集したら必ず実行してください
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## How about this templete image
aws-cdk-create-api直下の`./cdk-create-api.drawio`を参照ください。

## What's you need to edit

 * `cdk-templete-startup-edition-stack.ts` ：AWSのリソースを定義するファイルです。
                                            ユーザーがリソース定義のために編集するべきファイルはこのファイルのみとなります。
 * `src/lambda/*.js` ：スタックファイルで定義したLambda関数の定義先です。lambdaディレクトリ直下に関数を定義します。

## How to deploy your backend resource
 * `To start AWS-CDK: npm install -g aws-cdk` ：初めてAWS CDKを利用する際はCDKのインストールから実行してください
 * `To confirm install: cdk --version`
 * `STEP1. cd ./cdk-templete-startup-edition`
 * `STEP2. npm run build` ：作成したtypescriptファイルをjavascriptに変換します。
 * `STEP3. cdk diff` ：変更したアーキテクチャーの差分を確認できます　※必ずしも実行しなければいけない手順ではありません。
 * `STEP4. cdk deploy` ：アーキテクチャーの新規作成・更新を実行します。

## If you want to learn more about AWS CDK
AWS CDKの実装を新たに行いたい場合は、以下のリンクからリファレンスを参照してください。</br>
https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html </br>

## Cautions
<strong style="color: red;">注意１：配布時期から時間が経っている場合、node_modulesのモジュールのバージョンが古い可能性があります</strong></br>
<strong style="color: red;">注意２：また、aws-cdkのモジュールは各バージョンが統一されていない場合、互換性が失われてコンパイルエラーとなることがあります</strong>