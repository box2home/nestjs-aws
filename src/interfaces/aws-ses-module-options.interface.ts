import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ISESConfigOptions } from './aws-ses-module-options-params.interface';
/**
 *
 *
 * @export
 * @interface ISESModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISESModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (
        ...args: any[]
    ) => Promise<ISESConfigOptions> | ISESConfigOptions;
    inject?: any[];
}
