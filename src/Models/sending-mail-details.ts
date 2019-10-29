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
    htmlTemplate: string;

    /**
     * Creates an instance of AwsMailDetails.
     * @param {string} recipientADDRESS
     * @param {string} subjectOfMAIL
     * @param {string} contentOfMAIL
     * @param {string} TEMPLATE
     * @memberof IAwsMailDetails
     */
    constructor(
        recipientADDRESS: string,
        subjectOfMAIL: string,
        contentOfMAIL: string,
        htmlTemplate: string,
    ) {
        this.recipientADDRESS = recipientADDRESS;
        this.subjectOfMAIL = subjectOfMAIL;
        this.contentOfMAIL = contentOfMAIL;
        this.htmlTemplate = htmlTemplate;
    }
}
