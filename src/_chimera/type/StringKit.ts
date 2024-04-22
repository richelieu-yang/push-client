export class StringKit {
    /*
     * string => Uint8Array
     */
    static toUint8Array(str: string): Uint8Array {
        const encoder = new TextEncoder();
        return encoder.encode(str);
    }

}