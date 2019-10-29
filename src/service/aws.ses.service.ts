'use strict';
import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AwsMailDetails } from '../Models/sending-mail-details';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { ISESConfigOptions } from '../interfaces/aws-ses-module-options-params.interface';
import { AwsLogger } from './aws-logger.service';
/**
 *
 *
 * @export
 * @class AwsSesService
 */
@Injectable()
export class AwsSesService {
    private readonly _transporter;

    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: ISESConfigOptions,
        private readonly _logger: AwsLogger,
    ) {
        this._logger.log('initialising Aws Module', 'AWS SES SERVICE');
        // create reusable transporter object using the default SMTP transport
        this._transporter = nodemailer.createTransport({
            service: this._options.mailerSERVICE,
            host: this._options.mailerHOST,
            port: this._options.mailerPORT,
            secure: false,
            requireTLS: true,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: this._options.mailerUSER,
                pass: this._options.mailerPASSWORD,
            },
        });
    }

    /**
     *
     * SEND GENERIC MAIL
     *
     * @param {string} [senderAddress]
     * @param {string} [recipientAddress]
     * @param {string} [subjectOfMail]
     * @param {string} [contentOfMail]
     * @param {*} [template]
     * @memberof AwsSesService
     */
    async sendMail(
        recipientAddress: string,
        subjectOfMail: string,
        contentOfMail: string,
        template,
    ): Promise<AwsMailDetails> {
        // send mail with defined transport object
        const info = await this._transporter.sendMail({
            to: recipientAddress, //  'bar@example.com, baz@example.com', here you can set more then one reciver address
            subject: subjectOfMail, //   Subject line
            text: contentOfMail, //    plain text body
            html: template, //     html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return {
            recipientADDRESS: recipientAddress,
            subjectOfMAIL: subjectOfMail,
            contentOfMAIL: contentOfMail,
            htmlTemplate: template,
        };
    }
}
