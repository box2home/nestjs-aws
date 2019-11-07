'use strict';
import { HttpStatus, HttpException, Inject, Injectable, Logger } from '@nestjs/common';
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
        // promise send mail
        return this._transporter
            .sendMail(mailOptions)
            .then((info: SentMessageInfo) => {
                Logger.log('success[sendMail]:', info);
                return {
                    statusCode: HttpStatus.OK,
                    message: 'Mail Sent',
                    data: info,
                };
            })
            .catch((err) => {
                Logger.log('error[sendMail]:', err);
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Failed to send',
                    data: err,
                }, HttpStatus.BAD_REQUEST);
            });
    }
}