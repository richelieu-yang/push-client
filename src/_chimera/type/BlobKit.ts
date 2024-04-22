import {ArrayBufferKit} from "@/_chimera/type/ArrayBufferKit";

export class BlobKit {
    static toString(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsText(blob, 'UTF-8');
        });
    }

    // Blob => ArrayBuffer
    static toArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror = () => {
                reject(reader.error);
            };
            reader.readAsArrayBuffer(blob);
        });
    }

    static async toUint8Array(blob: Blob) {
        let ab = await BlobKit.toArrayBuffer(blob);
        return ArrayBufferKit.toUint8Array(ab);
    }

    static async toDataView(blob: Blob) {
        let ab = await BlobKit.toArrayBuffer(blob);
        return new DataView(ab);
    }

}