/**
 *
 *
 * @export
 * @class SNSConfigOptions
 */
export class SNSConfigOptions {
    awsSnsAccessKeyID: string;
    awsSnsSecretAccessKEY: string;
    awsSnsREGION: string;

    /**
     * Creates an instance of ISNSConfigOptions.
     * @param {string} awsSnsAccessKeyID
     * @param {string} awsSnsSecretAccessKEY
     * @param {string} awsSnsREGION
     * @memberof ISNSConfigOptions
     */
    constructor(
        awsSnsAccessKeyID: string,
        awsSnsSecretAccessKEY: string,
        awsSnsREGION: string,
    ) {
        this.awsSnsAccessKeyID = awsSnsAccessKeyID;
        this.awsSnsSecretAccessKEY = awsSnsSecretAccessKEY;
        this.awsSnsREGION = awsSnsREGION;
    }
}
