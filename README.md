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

           AwsModule.forRootSnsAsync(
            {
                useFactory: async (config: ConfigService) => {
                    return {

                               awsSnsAccessKeyID: 'AKIAIOJYQHTQLGRD7MWQ',
                               awsSnsSecretAccessKEY: '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',
                               awsSnsREGION: 'eu-west-1',
                    };
                },
                inject: [ConfigService],
            },
        ), 

    ],
  controllers: [AppController],
  providers: [AppService],
  

})
export class AppModule { }
`
Depending on which service you want to use you have access to the method of the requested service (SNS_SERVICE, S3_SERVICE,SES_SERVICE) which you can inject into any provider.

HERE AN EXAMPLE OF AN SNS SERVICE :
```typescript
import { Injectable, Inject, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsSmsDetails } from '../Models/sending-sms-details';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { ISNSConfigOptions } from '../interfaces/aws-sns-module-options-params.interface';

@Injectable()
export class AwsSnsService {
    private readonly _sns: AWS.SNS;
    private _smsOptions: AWS.SNS.PublishInput;
    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: ISNSConfigOptions,
    ) {
        Logger.log('initialising AWS Module', 'SNS SERVICE');
        AWS.config.update({
            accessKeyId: this._options.awsSnsAccessKeyID, // ConfigService.AWS_ACCESS_KEY_ID,//
            secretAccessKey: this._options.awsSnsSecretAccessKEY, //  ConfigService.AWS_SECRET_ACCESS_KEY,//
            region: this._options.awsSnsREGION, //   ConfigService.AWS_REGION
        });

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
    ): Promise<AwsSmsDetails> {
        this._smsOptions = {
            Message: messageToSend,
            Subject: subjectOfSms,
            PhoneNumber: mobileNumber,
        };

        this._sns.publish(this._smsOptions, (error: any, result: any) => {
            if (error) {
                Logger.error('ERROR ==>', error);
            } else {
                Logger.log('SUCCESS PUBLISHING SMS', result);
            }
        });
        return {
            mobileNumberCLIENT: mobileNumber,
            messageToSEND: messageToSend,
            subjectOfSMS: subjectOfSms,
        };
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
