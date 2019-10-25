
/**
 *
 *
 * @export
 * @class AwsSmsDetails
 */
export class AwsSmsDetails {
    mobileNumberClient: string;
    messageToSendToClient: string;
    subjectOfSMS: string;

   /**
    * Creates an instance of AwsSmsDetails.
    * @param {string} mobileNumberClient
    * @param {string} messageToSend
    * @param {string} subjectOfSms
    * @memberof AwsSmsDetails
    */
   constructor(mobileNumberClient: string, messageToSend: string, subjectOfSms: string) {
        this.mobileNumberClient = mobileNumberClient;
        this.messageToSendToClient = messageToSend;
        this.subjectOfSMS = subjectOfSms;
    }

}
