/**
 *
 *
 * @export
 * @class SESConfigOptions
 */
export class SESConfigOptions {
    mailerSERVICE: string;
    mailerHOST: string;
    mailerPORT: any;
    mailerUSER: string;
    mailerPASSWORD: string;
    /**
     * Creates an instance of ISESConfigOptions.
     * @param {string} mailerSERVICE
     * @param {string} mailerHOST
     * @param {*} mailerPORT
     * @param {string} mailerUSER
     * @param {string} mailerPASSWORD
     * @memberof ISESConfigOptions
     */
    constructor(
        mailerSERVICE: string,
        mailerHOST: string,
        mailerPORT: any,
        mailerUSER: string,
        mailerPASSWORD: string,
    ) {
        this.mailerSERVICE = mailerSERVICE;
        this.mailerHOST = mailerHOST;
        this.mailerPORT = mailerPORT;
        this.mailerUSER = mailerUSER;
        this.mailerPASSWORD = mailerPASSWORD;
    }
}
