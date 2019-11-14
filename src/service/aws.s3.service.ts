import { Injectable, Inject, Logger, HttpStatus, HttpException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { CONFIG_CONNECTION_OPTIONS } from '../constants';

/**
 * @export
 * @class AwsS3Service
 */
@Injectable()
export class AwsS3Service {
    private readonly _s3: AWS.S3;

    constructor(@Inject(CONFIG_CONNECTION_OPTIONS) private _options: AWS.S3.Types.ClientConfiguration) {
        Logger.log('initialising Aws Module', 'AWS S3 SERVICE');
        this._s3 = new AWS.S3(_options);
    }

    async upload(params: AWS.S3.Types.PutObjectRequest, callback?: (err: AWS.AWSError, data: AWS.S3.Types.PutObjectOutput) => void) {
        return this._s3.putObject(params, callback)
            .promise()
            .then((info: AWS.S3.Types.PutObjectOutput) => {
                Logger.log(` success[S3]: ${JSON.stringify(info)}`);
                return [
                    {
                        statusCode: HttpStatus.OK,
                        message: 'Sms sent',
                        data: info,
                    },
                ];
            })
            .catch((err) => {
                Logger.error('error[S3]:', err);
                throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Failed to upload',
                    data: err,
                }, HttpStatus.BAD_REQUEST);
            });
    }
}
