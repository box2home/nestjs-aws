import { Injectable, Inject, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import { IFile } from '../interfaces/IFile';
import { GeneratorService } from './generator.service';
import { CONFIG_CONNECTION_OPTIONS } from '../constants';
import { IS3ConfigOptions } from '../interfaces/aws-s3-module-options-params.interface';

/**
 * @export
 * @class AwsS3Service
 */
@Injectable()
export class AwsS3Service {
    private readonly _s3: AWS.S3;

    constructor(
        public generatorService: GeneratorService,
        @Inject(CONFIG_CONNECTION_OPTIONS) private _options: IS3ConfigOptions,
    ) {
        Logger.log('initialising Aws Module', 'AWS S3 SERVICE');
        const options: AWS.S3.Types.ClientConfiguration = {
            apiVersion: '2010-12-01',
            region: 'eu-central-1',
        };
        options.credentials = {
            accessKeyId: this._options.awsS3AccessKeyID,
            secretAccessKey: this._options.awsS3SecretAccessKEY,
        };
        this._s3 = new AWS.S3(options);
    }

    async uploadImage(file: IFile) {
        const fileName = this.generatorService.fileName(<string>(
            mime.extension(file.mimetype)
        ));
        const key = 'images/' + fileName;
        await this._s3
            .putObject({
                Bucket: this._options.awsS3BucketNAME,
                Body: file.buffer,
                ACL: 'public-read',
                Key: key,
            })
            .promise();

        return key;
    }
}
