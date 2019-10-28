'use strict';
import { Injectable, Inject } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AwsMailDetails } from '../Models/SendingMailDetails';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { SESConfigOptions } from '../Models/AwsModuleSesAsync';
/**
 *
 *
 * @export
 * @class AwsSesService
 */
@Injectable()
export class AwsSesService {
    private readonly _transporter;
    mailNotification = new AwsMailDetails('', '', '', '');
    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: SESConfigOptions,
    ) {
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
        this.mailNotification.recipientADDRESS = recipientAddress;
        this.mailNotification.subjectOfMAIL = subjectOfMail;
        this.mailNotification.contentOfMAIL = contentOfMail;
        this.mailNotification.htmlTemplate = template;

        // send mail with defined transport object
        const info = await this._transporter.sendMail({
            to: recipientAddress, //  'bar@example.com, baz@example.com', here you can set more then one reciver address
            subject: subjectOfMail, //   Subject line
            text: contentOfMail, //    plain text body
            html: template, //     html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return this.mailNotification;
    }
}
