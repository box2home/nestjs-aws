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
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private _options: ConfigurationOptions,
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
            await this._sns
                .publish(this._smsOptions)
                .promise()
                .then((info: PublishResponse) => {
                    console.log('RESPONSE SMS DETAILS ====>', info);
                    return [
                        {
                            success: HttpStatus.OK,
                            message: 'SMS SUCCESSFULLY SENDED',
                            data: info,
                        },
                    ];
                })
                .catch(err => {
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
