import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Options } from 'nodemailer/lib/smtp-transport';

/**
 * @export
 * @interface ISESModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISESModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<Options> | Options;
    inject?: any[];
}
