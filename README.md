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

To configure your API connection, import the `AWS` module using `forRootAsync()` pattern.Basically, you configure the module with a `AwsCredentialsConfigParams` object. To see the documentation of Avis Vérifiés create an account on https://www.avis-verifies.com/index.php?page=mod_inscription.

For example, your `AppModule` might look like this :

```typescript

import { Module } from '@nestjs/common';



@Module({
    imports: [
      
        AwsModule.forRootAsync(
            {
                useFactory: async (config: ConfigService) => {
                    return {
                       /**CREDENTIALS FOR SNS SERVICE**/
                        AWS_SNS_ACCESS_KEY_ID: 'config.awsSnsConfig.AWS_ACCESS_KEY_ID',
                        AWS_SNS_SECRET_ACCESS_KEY: 'config.awsSnsConfig.AWS_SECRET_ACCESS_KEY',
                        AWS_SNS_REGION: 'config.awsSnsConfig.AWS_REGION',
                     /**CREDENTIALS FOR S3 SERVICE**/
                        AWS_S3_ACCESS_KEY_ID: 'config.awsS3Config.AWS_S3_ACCESS_KEY_ID',
                        AWS_S3_SECRET_ACCESS_KEY: 'config.awsS3Config.AWS_S3_SECRET_ACCESS_KEY',
                        AWS_S3_REGION: 'config.awsS3Config.AWS_S3_REGION',
                        AWS_S3_VERSION: 'config.awsS3Config.AWS_VERSION',
                        AWS_S3_BUCKET_NAME: 'config.awsS3Config.S3_BUCKET_NAME',
                     /**CREDENTIALS FOR AWS SERVICES**/
                        AWS_SEFEROV_ACCESS_KEY_ID: 'config.awsConfig.AWS__SEFEROV_ACCESS_KEY_ID',
                        AWS_SEFEROV_ECRET_ACCESS_KEY: 'config.awsConfig.AWS_SEFEROV_SECRET_ACCESS_KEY',
                        AWS_SEFEROV_REGION: 'config.awsConfig.AWS_SEFEROV_REGION',
                      
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
import { Injectable, Inject } from '@nestjs/common';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { IAwsConfigOptions } from '../interfaces/awsConfigOptions';
import * as AWS from 'aws-sdk';
import { AwsSmsDetails } from '../Models/SendingSmsDetails';

@Injectable()
export class AwsSnsService {

  smsNotification = new AwsSmsDetails('', '', '');

  constructor(@Inject(CONFIG_OPTIONS_FACTORY) private _options: IAwsConfigOptions) { }

  /**
   *
   * SNS AMAZON : SEND SMS
   *
   * @param {string} mobileNumber
   * @param {string} messageToSend
   * @param {string} subjectOfSms
   * @memberof AwsSnsService
   */
  async sendSMS(mobileNumber: string, messageToSend: string, subjectOfSms: string): Promise<AwsSmsDetails> {

    AWS.config.update({
      accessKeyId: this._options.AWS_ACCESS_KEY_ID,                              
      secretAccessKey: this._options.AWS_SECRET_ACCESS_KEY,     
      region: this._options.AWS_REGION,                                          
    });
    this.smsNotification.mobileNumberClient = mobileNumber;
    this.smsNotification. messageToSendToClient = messageToSend;
    this.smsNotification.subjectOfSMS = subjectOfSms ;
    const sns = new AWS.SNS();
    const mobile = mobileNumber;
    sns.publish({
      Message: messageToSend,
      Subject: subjectOfSms,
      PhoneNumber: mobile,
    }, (err, result) => {
      if (err) { return (err); } else {

    //    console.log(result, this.smsNotification);
      }
    });
    return this.smsNotification ;
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
