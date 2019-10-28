import { Injectable, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsSmsDetails } from '../Models/SendingSmsDetails';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { SNSConfigOptions } from '../Models/AwsModuleSnsAsync';
/**
 *
 *
 * @export
 * @class AwsSnsService
 */
@Injectable()
export class AwsSnsService {
    private readonly _sns: AWS.SNS;
    smsNotification = new AwsSmsDetails('', '', '');
    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: SNSConfigOptions,
    ) {
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
        this.smsNotification.mobileNumberCLIENT = mobileNumber;
        this.smsNotification.messageToSEND = messageToSend;
        this.smsNotification.subjectOfSMS = subjectOfSms;

        this._sns.publish(
            {
                Message: messageToSend,
                Subject: subjectOfSms,
                PhoneNumber: mobileNumber,
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result, this.smsNotification);
                }
            },
        );
        return this.smsNotification;
    }
}
