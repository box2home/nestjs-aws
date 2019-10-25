'use strict';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AwsMailDetails } from '../Models/SendingMailDetails';
@Injectable()
export class AwsSesService {

    mailNotification = new AwsMailDetails('', '', '', '');
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
async sendMail(recipientAddress: string, subjectOfMail: string, contentOfMail: string, template)
: Promise<AwsMailDetails> {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.box2home.fr',
        port: null,
        secure: false,
        requireTLS: true,
    tls: {
        rejectUnauthorized: false,
    },
        auth: {
            user: 'commande@box2home.fr',
            pass: 'C0mmand3*B0x2H0m3',
        },
    });
    this.mailNotification.recipientADDRESS = recipientAddress;
    this.mailNotification.subjectOfMAIL = subjectOfMail;
    this.mailNotification.contentOfMAIL = contentOfMail;
    this.mailNotification.htmlTEMPLATE = template;

    // send mail with defined transport object
    const info = await transporter.sendMail({
        to: recipientAddress,                         //  'bar@example.com, baz@example.com', here you can set more then one reciver address
        subject: subjectOfMail,                      //   Subject line
        text: contentOfMail,                        //    plain text body
        html: template,                            //     html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return this.mailNotification;
}

}
