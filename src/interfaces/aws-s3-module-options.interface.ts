import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IS3ConfigOptions } from './aws-s3-module-options-params.interface';

/**
 * @export
 * @interface IS3ModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface IS3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<IS3ConfigOptions> | IS3ConfigOptions;
    inject?: any[];
}
