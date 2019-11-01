'use strict';
import { Injectable, Inject, Logger, HttpStatus } from '@nestjs/common';
import { CONFIG_CONNECTION_OPTIONS } from '../constants';
import { Attachment } from 'nodemailer/lib/mailer';
import { Email } from 'aws-sdk/clients/connect';
import { Options } from 'nodemailer/lib/smtp-connection';
import {
    Transporter,
    SendMailOptions,
    createTransport,
    SentMessageInfo,
} from 'nodemailer';
@Injectable()
export class AwsSesService {
    private readonly _transporter: Transporter;
    private _mailOptions: SendMailOptions;

    constructor(@Inject(CONFIG_CONNECTION_OPTIONS) private _options: Options) {
        Logger.log('initialising AWS Module', 'SES SERVICE');
        // create reusable transporter object using the default SMTP transport
        this._transporter = createTransport(this._options);
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
        recipientAddress: Email,
        subjectOfMail: string,
        contentOfMail: string,
        template: string,
        attachment?: Attachment[],
        senderAddress?: Email,
    ) {
        // setup e-mail data with unicode symbols
        this._mailOptions = {
            from: senderAddress,
            to: recipientAddress, //  'bar@example.com, baz@example.com', here you can set more then one reciver address
            subject: subjectOfMail, //   Subject line
            text: contentOfMail, //    plain text body
            html: template, //     html body
            attachments: attachment,
        };

        return [
            // promise send mail
            await this._transporter
                .sendMail(this._mailOptions)
                .then((info: SentMessageInfo) => {
                    console.log('RESPONSE MAIL DETAILS ====>', info);
                    return [
                        {
                            success: HttpStatus.OK,
                            message: 'MAIL SUCCESSFULLY SENDED',
                            data: info,
                        },
                    ];
                })
                .catch((err) => {
                    console.log('ERROR : FAILD REQUEST!!====>', err);
                    return [
                        {
                            error: HttpStatus.EXPECTATION_FAILED,
                            message: ['FAILD TO SEND MAIL', err],
                        },
                    ];
                }),
        ];
        //  console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
