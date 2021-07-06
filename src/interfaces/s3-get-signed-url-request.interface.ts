'use strict';

/**
 * @export
 * @interface IGetSignedUrlRequest
 */
export interface IGetSignedUrlRequest {
    Bucket: string;
    Key: string;
    Expires?: number;
}
