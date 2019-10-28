import { Module, DynamicModule } from '@nestjs/common';
import { AwsSnsService } from './service/aws.sns.service';
import { CONFIG_OPTIONS_FACTORY } from './constants';
import { AwsSesService } from './service/aws.ses.service';
import { ISNSModuleAsyncOptions } from './interfaces/awsModulesAsynSNS';
import { ISesModuleAsyncOptions } from './interfaces/awsModuleAsynSES';
import { IS3ModuleAsyncOptions } from './interfaces/awsModuleAsyncS3';
import { AwsS3Service } from './service/aws.s3.service';
import { GeneratorService } from './service/generator.service';
/**
 *
 *
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

    static forRootSesAsync(options: ISesModuleAsyncOptions): DynamicModule {
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
