/**
 *
 *
 * @export
 * @class AwsMailDetails
 */
export class AwsMailDetails {
    recipientADDRESS: string;
    subjectOfMAIL: string;
    contentOfMAIL: string;
    htmlTEMPLATE: string;
    /**
     * Creates an instance of AwsMailDetails.
     * @param {string} recipientADDRESS
     * @param {string} subjectOfMAIL
     * @param {string} contentOfMAIL
     * @param {string} htmlTemplate
     * @memberof AwsMailDetails
     */
    constructor(recipientADDRESS: string, subjectOfMAIL: string, contentOfMAIL: string, htmlTemplate: string) {

        this.recipientADDRESS = recipientADDRESS;
        this.subjectOfMAIL = subjectOfMAIL;
        this.contentOfMAIL = contentOfMAIL;
        this.htmlTEMPLATE = htmlTemplate;
    }

}
