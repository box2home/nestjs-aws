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
      accessKeyId: this._options.AWS_ACCESS_KEY_ID,                              // ConfigService.AWS_ACCESS_KEY_ID,//
      secretAccessKey: this._options.AWS_SECRET_ACCESS_KEY,     //  ConfigService.AWS_SECRET_ACCESS_KEY,//
      region: this._options.AWS_REGION,                                            //   ConfigService.AWS_REGION
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
