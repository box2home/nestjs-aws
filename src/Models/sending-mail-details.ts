import { Attachment } from 'nodemailer/lib/mailer';
import { Address } from 'aws-sdk/clients/ses';

/**
 *
 *
 * @export
 * @class AwsMailDetails
 */
export class AwsMailDetails {
    senderADDRESS?: Address;
    recipientADDRESS: Address;
    subjectOfMAIL: string;
    contentOfMAIL: string;
    htmlTEMPLATE: string;
    attachments?: Attachment[];

    /**
     * Creates an instance of AwsMailDetails.
     * @param {Address} senderAddress
     * @param {Address} recipientADDRESS
     * @param {string} subjectOfMAIL
     * @param {string} contentOfMAIL
     * @param {string} htmlTemplate
     * @param {Attachment[]} attachments
     * @memberof AwsMailDetails
     */
    constructor(
        senderAddress: Address,
        recipientADDRESS: Address,
        subjectOfMAIL: string,
        contentOfMAIL: string,
        htmlTemplate: string,
        attachments: Attachment[],
    ) {
        this.senderADDRESS = senderAddress;
        this.recipientADDRESS = recipientADDRESS;
        this.subjectOfMAIL = subjectOfMAIL;
        this.contentOfMAIL = contentOfMAIL;
        this.htmlTEMPLATE = htmlTemplate;
        this.attachments = attachments;
    }
}
