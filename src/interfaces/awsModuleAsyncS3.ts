import { ModuleMetadata } from '@nestjs/common/interfaces';
import { S3ConfigOptions } from '../Models/AwsModuleS3Async';
/**
 *
 *
 * @export
 * @interface IS3ModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface IS3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<S3ConfigOptions> | S3ConfigOptions;
    inject?: any[];
}
