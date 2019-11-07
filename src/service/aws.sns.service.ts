import { Injectable, Inject, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { CONFIG_CONNECTION_OPTIONS } from '../constants';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import { PublishResponse, PublishInput } from 'aws-sdk/clients/sns';
import AWS, { SNS } from 'aws-sdk';

/**
 * @export
 * @class AwsSnsService
 */
@Injectable()
export class AwsSnsService {
    private readonly _sns: SNS;
    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private _options: ConfigurationOptions,
    ) {
        Logger.log('initialising AWS Module', 'SNS SERVICE');
        AWS.config.update(this._options);
        this._sns = new AWS.SNS();
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
