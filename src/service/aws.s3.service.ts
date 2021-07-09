import {
    Injectable,
    Inject,
    Logger,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CopyObjectRequest, DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { exception } from 'console';

import { CONFIG_CONNECTION_OPTIONS } from '../constants';
import { IGetSignedUrlRequest } from '../interfaces/s3-get-signed-url-request.interface';

/**
 * @export
 * @class AwsS3Service
 */
@Injectable()
export class AwsS3Service {
    private readonly _s3: AWS.S3;

    constructor(
        @Inject(CONFIG_CONNECTION_OPTIONS)
        private _options: AWS.S3.Types.ClientConfiguration,
    ) {
        Logger.log('initialising Aws Module', 'AWS S3 SERVICE');
        this._s3 = new AWS.S3(_options);
    }

    async upload(params: AWS.S3.Types.PutObjectRequest) {
        return this._s3
            .putObject(params)
            .promise()
            .then((info: AWS.S3.Types.PutObjectOutput) => {
                Logger.log(`success[S3]: ${JSON.stringify(info)}`);
                return [
                    {
                        statusCode: HttpStatus.OK,
                        message: 'success',
                        data: {
                            url: `https://${params.Bucket}.s3-${this._s3.config.region}.amazonaws.com/${params.Key}`,
                        },
                    },
                ];
            })
            .catch((err: AWS.AWSError) => {
                Logger.error(
                    err.message,
                    `success[S3]: ${JSON.stringify(err)}`,
                );
                throw new HttpException(
                    {
                        statusCode: err.statusCode,
                        message: 'error',
                        data: err,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            });
    }

    async getObject(params: AWS.S3.Types.GetObjectAclRequest) {
        try {
            return this._s3
                .getObject(params)
                .promise()
                .then(fileData => {
                    return fileData.Body.toString('utf-8');
                });
        } catch (error) {
            throw new HttpException(
                {
                    statusCode: error.statusCode,
                    message: 'error',
                    data: error,
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async getUploadSignedUrl(params: IGetSignedUrlRequest) {
        try {
            return this._s3
                .getSignedUrlPromise('putObject', {
                    ...params,
                    ACL: 'public-read',
                })
                .then((signedUrl: string) => {
                    Logger.log(
                        `signed url generated successfully: ${signedUrl}`,
                    );
                    return signedUrl;
                });
        } catch (err) {
            Logger.error(
                err.message,
                `unable to generate the signed url: ${JSON.stringify(err)}`,
            );
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async copyObject(params: CopyObjectRequest) {
        try {
            return this._s3.copyObject(params, async function(err, data) {
                if (err) Logger.log(err, err.stack);
                // an error occurred
                else {
                    Logger.log(data);
                    return data;
                } // successful response
            });
        } catch (err) {
            Logger.error(
                err.message,
                `unable to copy object: ${JSON.stringify(err)}`,
            );
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteObject(params: DeleteObjectRequest) {
        try {
            return this._s3.deleteObject(params).promise();
        } catch (err) {
            Logger.error(
                err.message,
                `unable to delete object: ${JSON.stringify(err)}`,
            );
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}
