export class Uint8ArrayKit {
    static toString(ua: Uint8Array): string {
        let decoder = new TextDecoder();
        return decoder.decode(ua);
    }

    static toDataView(ua: Uint8Array){
        return new DataView(ua.buffer);
    }

}