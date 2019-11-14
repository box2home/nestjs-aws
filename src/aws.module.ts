import { DynamicModule, Module } from '@nestjs/common';

import { CONFIG_CONNECTION_OPTIONS } from './constants';
import { IS3ModuleAsyncOptions } from './interfaces/aws-s3-module-options.interface';
import { ISESModuleAsyncOptions } from './interfaces/aws-ses-module-options.interface';
import { ISNSModuleAsyncOptions } from './interfaces/aws-sns-module-options.interface';
import { AwsS3Service } from './service/aws.s3.service';
import { AwsSesService } from './service/aws.ses.service';
import { AwsSnsService } from './service/aws.sns.service';
import { GeneratorService } from './service/generator.service';

/**
 * @export
 * @class AwsModule
 */
@Module({})
export class AwsModule {
    static forRootSnsAsync(options: ISNSModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                AwsSnsService,
            ],
            exports: [AwsSnsService],
        };
    }

    static forRootSesAsync(options: ISESModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                AwsSesService,
            ],
            exports: [AwsSesService],
        };
    }

    static forRootS3Async(options: IS3ModuleAsyncOptions): DynamicModule {
        return {
            module: AwsModule,
            providers: [
                {
                    provide: CONFIG_CONNECTION_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                AwsS3Service,
                GeneratorService,
            ],
            exports: [AwsS3Service, GeneratorService],
        };
    }
}
