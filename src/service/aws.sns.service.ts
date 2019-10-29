import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { AwsSmsDetails, ISNSConfigOptions } from '..';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { AwsLogger } from './aws-logger.service';

/**
 * @export
 * @class AwsSnsService
 */
@Injectable()
export class AwsSnsService {
    private readonly _sns: AWS.SNS;

    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: ISNSConfigOptions,
        private readonly _logger: AwsLogger,
    ) {
        this._logger.log('initialising Aws Module', 'AWS SNS SERVICE');
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
                    console.log(result);
                }
            },
        );
        return {
            mobileNumberCLIENT: mobileNumber,
            messageToSEND: messageToSend,
            subjectOfSMS: subjectOfSms,
        };
    }
}
