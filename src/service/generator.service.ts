import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';
/**
 *
 *
 * @export
 * @class GeneratorService
 */
@Injectable()
export class GeneratorService {
    public uuid(): string {
        return uuid();
    }
    public fileName(ext: string) {
        return this.uuid() + '.' + ext;
    }
}
