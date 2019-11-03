import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Options as SMTPTransportOptions} from 'nodemailer/lib/smtp-transport';

/**
 * @export
 * @interface ISESModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISESModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<SMTPTransportOptions> | SMTPTransportOptions;
    inject?: any[];
}
