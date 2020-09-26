#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkCreateApiStack } from '../lib/aws-cdk-create-api-stack';

const app = new cdk.App();
new AwsCdkCreateApiStack(app, 'AwsCdkCreateApiStack');
