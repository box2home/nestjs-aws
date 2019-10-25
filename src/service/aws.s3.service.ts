import { Injectable, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { IFile } from '../interfaces/IFile';
import * as mime from 'mime-types';
import { GeneratorService } from './generator.service';
import { CONFIG_OPTIONS_FACTORY } from '../constants';
import { IAwsConfigOptions } from '../interfaces/awsConfigOptions';
@Injectable()
export class AwsS3Service {
    private readonly _s3: AWS.S3;

    constructor(
       public generatorService: GeneratorService, @Inject(CONFIG_OPTIONS_FACTORY) private _options: IAwsConfigOptions
    ) {
        const options: AWS.S3.Types.ClientConfiguration = {
            apiVersion: '2010-12-01',
            region: 'eu-central-1',
        };

        options.credentials = {
            accessKeyId: this._options.AWS_ACCESS_KEY_ID,
            secretAccessKey: this._options.AWS_SECRET_ACCESS_KEY,
        };

        this._s3 = new AWS.S3(options);

    }

    async uploadImage(file: IFile) {
        const fileName = this.generatorService.fileName(<string>mime.extension(file.mimetype));
        const key = 'images/' + fileName;
        await this._s3.putObject({
            Bucket: this._options.AWS_S3_BUCKET_NAME,
            Body: file.buffer,
            ACL: 'public-read',
            Key: key,
        }).promise();

        return key;
    }
}
