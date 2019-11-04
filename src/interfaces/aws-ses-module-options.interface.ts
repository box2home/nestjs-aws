import { ModuleMetadata } from '@nestjs/common/interfaces';
import { Options } from 'nodemailer/lib/smtp-transport';

export declare type SMTPTransportOptions = Options;

/**
 * @export
 * @interface ISESModuleAsyncOptions
 * @extends {Pick<ModuleMetadata, 'imports'>}
 */
export interface ISESModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<SMTPTransportOptions> | SMTPTransportOptions;
    inject?: any[];
}
