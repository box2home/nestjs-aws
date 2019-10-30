import { Injectable, Inject, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsSmsDetails} from '../Models/sending-sms-details';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { ISNSConfigOptions } from '../interfaces/aws-sns-module-options-params.interface';
/**
 * @export
 * @class AwsSnsService
 */
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
