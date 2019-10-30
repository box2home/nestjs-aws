'use strict';
import { Injectable, Inject, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AwsMailDetails } from '../Models/sending-mail-details';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { ISESConfigOptions } from '../interfaces/aws-ses-module-options-params.interface';
import { Attachment } from 'nodemailer/lib/mailer';
import { Address } from 'aws-sdk/clients/ses';
@Injectable()
export class AwsSesService {
    private readonly _transporter: nodemailer.Transporter;
    private _mailOptions: nodemailer.SendMailOptions;

    constructor(
        @Inject(CONFIG_OPTIONS_FACTORY) private _options: ISESConfigOptions,
    ) {
        Logger.log('initialising AWS Module', 'SES SERVICE');
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
     *
     * @param {string} recipientAddress
     * @param {string} subjectOfMail
     * @param {string} contentOfMail
     * @param {string} template
     * @param {string} [senderAddress]
     * @param {string[]} [attachement]
     * @returns {Promise<AwsMailDetails>}
     * @memberof AwsSesService
     */
    async sendMail(
        recipientAddress: Address,
        subjectOfMail: string,
        contentOfMail: string,
        template: string,
        attachment?: Attachment[],
        senderAddress?: Address,
    ): Promise<AwsMailDetails> {
        // setup e-mail data with unicode symbols
        this._mailOptions = {
            from: senderAddress,
            to: recipientAddress, //  'bar@example.com, baz@example.com', here you can set more then one reciver address
            subject: subjectOfMail, //   Subject line
            text: contentOfMail, //    plain text body
            html: template, //     html body
            attachments: attachment,
        };

        // promise send mail
        this._transporter
            .sendMail(this._mailOptions)
            .then((info: nodemailer.SentMessageInfo) => info.messageId)
            .catch((err) => {
                Logger.log('ERROR ==>', err);
            });
        //  console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return {
            senderADDRESS: senderAddress,
            recipientADDRESS: recipientAddress,
            subjectOfMAIL: subjectOfMail,
            contentOfMAIL: contentOfMail,
            htmlTEMPLATE: template,
            attachments: attachment,
        };
    }
}
