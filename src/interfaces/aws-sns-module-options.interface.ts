import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ISNSConfigOptions } from './aws-sns-module-options-params.interface';

/**
 *  @export
 * @interface ISNSModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISNSModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<ISNSConfigOptions> | ISNSConfigOptions;
    inject?: any[];
}
