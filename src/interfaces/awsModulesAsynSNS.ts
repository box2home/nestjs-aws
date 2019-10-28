import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SNSConfigOptions } from '../Models/AwsModuleSnsAsync';
/**
 *
 *
 * @export
 * @interface ISNSModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISNSModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (
        ...args: any[]
    ) => Promise<SNSConfigOptions> | SNSConfigOptions;
    inject?: any[];
}
