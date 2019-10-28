/**
 *
 *
 * @export
 * @class S3ConfigOptions
 */
export class S3ConfigOptions {
    awsS3AccessKeyID: string;
    awsS3SecretAccessKEY: string;
    awsS3REGION: string;
    awsS3VERSION: string;
    awsS3BucketNAME: string;
    /**
     * Creates an instance of IS3ConfigOptions.
     * @param {string} awsS3AccessKeyID
     * @param {string} awsS3SecretAccessKEY
     * @param {string} awsS3REGION
     * @param {string} awsS3VERSION
     * @param {string} awsS3BucketNAME
     * @memberof IS3ConfigOptions
     */
    constructor(
        awsS3AccessKeyID: string,
        awsS3SecretAccessKEY: string,
        awsS3REGION: string,
        awsS3VERSION: string,
        awsS3BucketNAME: string,
    ) {
        this.awsS3AccessKeyID = awsS3AccessKeyID;
        this.awsS3SecretAccessKEY = awsS3SecretAccessKEY;
        this.awsS3REGION = awsS3REGION;
        this.awsS3VERSION = awsS3VERSION;
        this.awsS3BucketNAME = awsS3BucketNAME;
    }
}
