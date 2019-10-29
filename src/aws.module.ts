import { DynamicModule, Module } from '@nestjs/common';
import { AwsSnsService } from './service/aws.sns.service';
import { CONFIG_OPTIONS_FACTORY } from './constants';
import { AwsSesService } from './service/aws.ses.service';
import { ISNSModuleAsyncOptions } from './interfaces/aws-sns-module-options.interface';
import { ISESModuleAsyncOptions } from './interfaces/aws-ses-module-options.interface';
import { IS3ModuleAsyncOptions } from './interfaces/aws-s3-module-options.interface';
import { AwsS3Service } from './service/aws.s3.service';
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
                    provide: CONFIG_OPTIONS_FACTORY,
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
                    provide: CONFIG_OPTIONS_FACTORY,
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
                    provide: CONFIG_OPTIONS_FACTORY,
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
