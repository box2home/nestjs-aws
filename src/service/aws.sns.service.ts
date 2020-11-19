import { Injectable, Inject, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { PublishResponse, PublishInput } from 'aws-sdk/clients/sns';
import { ConfigurationOptions } from 'aws-sdk';

import { CONFIG_CONNECTION_OPTIONS } from '../constants';

/**
 * @export
 * @class AwsSnsService
 */
@Injectable()
export class AwsSnsService {
    private readonly _sns: SNS;
    constructor(@Inject(CONFIG_CONNECTION_OPTIONS) private _options: ConfigurationOptions) {
        Logger.log('initialising AWS Module', 'SNS SERVICE');
        this._sns = new SNS(this._options);
    }

    async sendSMS(smsOptions: PublishInput) {

        return this._sns
                .publish(smsOptions)
                .promise()
                .then((info: PublishResponse) => {
                    Logger.log(` success[sendSms]: ${JSON.stringify(info)}`);
                    return [
                        {
                            statusCode: HttpStatus.OK,
                            message: 'Sms sent',
                            data: info,
                        },
                    ];
                })
                .catch((err) => {
                    Logger.error('error[sendSms]:', err);
                    throw new HttpException({
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Failed to send',
                        data: err,
                    }, HttpStatus.BAD_REQUEST);
                });
    }
}
