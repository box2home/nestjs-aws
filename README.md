<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">A MODULE FOR AWS SERVICES (sns,s3,ses)</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
    <img src="https://badge.fury.io/js/%40nestjsplus%2Fmassive.svg" alt="npm version" height="18">    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation
##### Installation missing dependencies (aws_sdk , nodeMailer)
> npm install

### About AWS SERVICES

This module is a thin layer on top of the [AWS_SERVICES API](https://aws.amazon.com/fr/#).



### Quick Start

To configure your API connection, import the `AWS` module  according to the service you want to use  by using the appropriate method. For example to use the SMS Service you need to import the module `AWS`  with the `forRootSnsAsync()` Method.Basically, you configure the module with a `AwsCredentialsConfigParams` object depending to te Service used. To see the documentation of Api AWS  create an account on https://aws.amazon.com/fr/#.

For example, your `AppModule` might look like this :

```typescript

import { Module } from '@nestjs/common';



@Module({
    imports: [

         AwsModule.forRootSnsAsync({
            useFactory: async () => {
                return {
   
                           accessKeyId:'YOUR ACCESS KEY ID',
                           secretAccessKey:  'YOUR SERCRET ACCESS KEY',
                           region: 'REGION SERVICE',

                };
            },
            inject: [],
        }),
  controllers: [AppController],
  providers: [AppService],
  

})
export class AppModule { }
`
Depending on which service you want to use you have access to the method of the requested service (SNS_SERVICE, S3_SERVICE,SES_SERVICE) which you can inject into any provider.

HERE AN EXAMPLE OF AN SNS SERVICE :
```typescript
import { Injectable, Inject, Logger, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CONFIG_CONNECTION_OPTIONS } from '../constants';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import { PublishResponse } from 'aws-sdk/clients/sns';
/**
 * @export
 * @class AwsSnsService
 */
@Injectable()
export class AwsSnsService {
    private readonly _sns: AWS.SNS;
    private _smsOptions: AWS.SNS.PublishInput;
    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS) private _options: ConfigurationOptions,
    ) {
        Logger.log('initialising AWS Module', 'SNS SERVICE');
        AWS.config.update(this._options);
        this._sns = new AWS.SNS();
    }

    /**
     *
     * SNS AMAZON SEND SMS
     *
     * @param {string} mobileNumber
     * @param {string} messageToSend
     * @param {string} subjectOfSms
     * @memberof AwsSnsService
     */
    async sendSMS(
        mobileNumber: string,
        messageToSend: string,
        subjectOfSms: string,
    ) {
        this._smsOptions = {
            Message: messageToSend,
            Subject: subjectOfSms,
            PhoneNumber: mobileNumber,
        };

        return [
            await this._sns.publish(
            this._smsOptions).promise().then((info: PublishResponse) => {
                console.log('RESPONSE SMS DETAILS ====>', info);
                return [
                    {
                        success: HttpStatus.OK,
                        message: 'SMS SUCCESSFULLY SENDED',
                        data: info,
                    },
                ];
            }).catch((err) => {
                console.log('ERROR : FAILD REQUEST !! ====>', err);
                return [
                    {
                        error: HttpStatus.EXPECTATION_FAILED,
                        message: ['FAILD TO SEND SMS ', err],
                    },
                ];
            }),
        ];
    }
}

```



### To Do

- [x] Tests

### Change Log

See [Changelog](CHANGELOG.md) for more information.

### Author

**ABBES Mohamed Amine**

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
