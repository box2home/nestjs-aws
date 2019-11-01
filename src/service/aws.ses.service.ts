'use strict';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-connection';

import { CONFIG_CONNECTION_OPTIONS } from '../constants';

@Injectable()
export class AwsSesService {
    private readonly _transporter: Transporter;

    constructor(@Inject(CONFIG_CONNECTION_OPTIONS) private _options: Options) {
        Logger.log('initialising AWS Module', 'SES SERVICE');
        // create reusable transporter object using the default SMTP transport
        this._transporter = createTransport(this._options);
    }
    /**
     *
     * @param {SendMailOptions} mailOptions
     */
    async sendMail(mailOptions: SendMailOptions) {
        return [
            // promise send mail
            await this._transporter
                .sendMail(mailOptions)
                .then((info: SentMessageInfo) => {
                    Logger.log('RESPONSE MAIL DETAILS ====>', info);
                    return [
                        {
                            success: HttpStatus.OK,
                            message: 'MAIL SUCCESSFULLY SENDED',
                            data: info,
                        },
                    ];
                })
                .catch((err) => {
                    Logger.log('ERROR : FAILD REQUEST!!====>', err);
                    return [
                        {
                            error: HttpStatus.EXPECTATION_FAILED,
                            message: ['FAILD TO SEND MAIL', err],
                        },
                    ];
                }),
        ];
    }
}
