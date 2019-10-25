import { IAwsConfigOptions } from './awsConfigOptions';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface IAwsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<IAwsConfigOptions> | IAwsConfigOptions;
    inject?: any[];
}
