import {Console} from "@/_internal/Console";
import {BrotliKit} from "@/_chimera/compress/BrotliKit";

/*
 * 后端推送消息的类型: binary(brotli)
 */
export class MsgHandler1 {
    static async handle(data: ArrayBuffer | Blob | string) {
        if (typeof data === "string") {
            Console.println(`on message(text): ${data}`);
            return;
        }

        if (data instanceof ArrayBuffer) {
            let msg = await BrotliKit.decompressToString(data);
            Console.println(`on message(binary ArrayBuffer, brotli): ${msg}`);
            return;
        }
        let msg = await BrotliKit.decompressToString(data);
        Console.println(`on message(binary Blob, brotli): ${msg}`);
    }

}