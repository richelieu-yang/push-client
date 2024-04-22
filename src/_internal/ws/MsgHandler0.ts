import {Console} from "@/_internal/Console";
import {GzipKit} from "@/_chimera/compress/GzipKit";
import {ArrayBufferKit} from "@/_chimera/type/ArrayBufferKit";
import {BlobKit} from "@/_chimera/type/BlobKit";

/*
 * 后端推送消息的类型: text || binary(no compress) || binary(gzip)
 */
export class MsgHandler0 {
    static async handle(data: ArrayBuffer | Blob | string) {
        if (typeof data === "string") {
            Console.println(`on message(text): ${data}`);
            return;
        }

        if (data instanceof ArrayBuffer) {
            if (await GzipKit.isGzipCompressed(data)) {
                let msg = await GzipKit.decompressToString(data);
                Console.println(`on message(binary ArrayBuffer, gzip): ${msg}`);
                return;
            }
            let msg = ArrayBufferKit.toString(data);
            Console.println(`on message(binary ArrayBuffer, no compress): ${msg}`);
        } else {
            if (await GzipKit.isGzipCompressed(data)) {
                let msg = await GzipKit.decompressToString(data);
                Console.println(`on message(binary Blob, gzip): ${msg}`);
                return;
            }
            let msg = await BlobKit.toString(data);
            Console.println(`on message(binary Blob, no compress): ${msg}`);
        }
    }

}