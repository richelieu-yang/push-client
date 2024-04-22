import {fromByteArray, toByteArray} from "base64-js";
import {Uint8ArrayKit} from "@/_chimera/type/Uint8ArrayKit";
import {StringKit} from "@/_chimera/type/StringKit";

export class Base64Kit {
    /*
     * base64 编码
     */
    static encodeStringToString(str: string): string {
        let ua = StringKit.toUint8Array(str);
        return fromByteArray(ua);
    }

    /*
     * base64 解码
     */
    static decodeString(base64Str: string): Uint8Array {
        return toByteArray(base64Str);
    }

    /*
     * base64 解码
     */
    static decodeStringToString(base64Str: string): string {
        let ua = this.decodeString(base64Str);
        return Uint8ArrayKit.toString(ua);
    }

}