import { Module, DynamicModule } from '@nestjs/common';
import { IAwsConfigOptions } from './interfaces/awsConfigOptions';
import { AwsSnsService } from './service/aws.sns.service';
import { IAwsModuleAsyncOptions } from './interfaces/awsModuleAsyncOptions';
import { CONFIG_OPTIONS_FACTORY } from './constants';
import { AwsSesService } from './service/aws.ses.service';

@Module({

})
export class AwsModule {

  /**
   *
   *
   * @static
   * @param {IAwsConfigOptions} options
   * @returns {DynamicModule}
   * @memberof AwsModule
   */
  static forRoot(
    options: IAwsConfigOptions,
  ): DynamicModule {
    return {
      module: AwsModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        AwsSnsService,
      ],
      exports: [AwsSnsService],
    };
  }
  /**
   *
   *
   *
   * @static
   * @param {IAwsModuleAsyncOptions} options
   * @returns {DynamicModule}
   * @memberof AwsModule
   */
  static forRootAsync(
    options: IAwsModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: AwsModule,
      providers: [
        {
          provide: CONFIG_OPTIONS_FACTORY,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        AwsSnsService,
        AwsSesService,
      ],
      exports: [AwsSnsService, AwsSesService],
    };
  }
}
