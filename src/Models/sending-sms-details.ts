/**
 * @export
 * @class AwsSmsDetails
 */
export class AwsSmsDetails {
    mobileNumberCLIENT: string;
    messageToSEND: string;
    subjectOfSMS: string;

    /**
     * Creates an instance of AwsSmsDetails.
     * @param {string} mobileNumberCLIENT
     * @param {string} messageToSEND
     * @param {string} subjectOfSMS
     * @memberof AwsSmsDetails
     */
    constructor(
        mobileNumberCLIENT: string,
        messageToSEND: string,
        subjectOfSMS: string,
    ) {
        this.mobileNumberCLIENT = mobileNumberCLIENT;
        this.messageToSEND = messageToSEND;
        this.subjectOfSMS = subjectOfSMS;
    }
}
