import pako from "pako";
import {Uint8ArrayKit} from "@/_chimera/type/Uint8ArrayKit";
import {BlobKit} from "@/_chimera/type/BlobKit";
import {ArrayBufferKit} from "@/_chimera/type/ArrayBufferKit";

/*
 * 需要安装第三方库，命令: npm install @types/pako pako
 */
export class GzipKit {
    static async decompress(compressed: Uint8Array | ArrayBuffer | Blob) {
        if (compressed instanceof Blob) {
            let ab = await BlobKit.toArrayBuffer(compressed)
            return pako.inflate(ab);
        }
        return pako.inflate(compressed);
    }

    static async decompressToString(compressed: Uint8Array | ArrayBuffer| Blob) {
        if (compressed instanceof Blob) {
            let ab = await BlobKit.toArrayBuffer(compressed)
            return pako.ungzip(ab, { to: 'string' });
        }
        return pako.ungzip(compressed, { to: 'string' });
    }

    /*
     * 作用: 判断数据是否为GZIP压缩，用于判断是否需要解压缩
     *
     * @param data 待判断的数据，ArrayBuffer类型
     */
    static async isGzipCompressed(data: Uint8Array | ArrayBuffer| Blob) {
        let dv:DataView;
        if (data instanceof ArrayBuffer) {
            dv = ArrayBufferKit.toDataView(data);
        }else if (data instanceof Blob) {
            dv = await BlobKit.toDataView(data);
        }else{
            dv = Uint8ArrayKit.toDataView(data);
        }

        // 这里仅作为示例，实际判断逻辑需根据数据源和协议来确定
        // 例如，检查数据头部的GZIP标识符（两个字节：0x1f 0x8b）
        return dv.getUint8(0) === 0x1f && dv.getUint8(1) === 0x8b;
    }
}