import { ModuleMetadata } from '@nestjs/common/interfaces';
import { SESConfigOptions } from '../Models/AwsModuleSesAsync';
/**
 *
 *
 * @export
 * @interface ISesModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISesModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (
        ...args: any[]
    ) => Promise<SESConfigOptions> | SESConfigOptions;
    inject?: any[];
}
