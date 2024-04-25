import {SessionStorageUtil} from "@/_internal/utils/SessionStorageUtil";
import {Console} from "@/_internal/utils/Console";
import {MsgHandlerRaw} from "@/_internal/sse/MsgHandlerRaw";
import {MsgHandlerBase64} from "@/_internal/sse/MsgHandlerBase64";
import {SseKit} from "@/_chimera/longConnection/SseKit";

export class SseClient {
    private static client: EventSource | null = null;

    static connect(url: string, pushType: number) {
        this.disconnect();

        if (!SseKit.checkUrl(url)) {
            alert(`SSE url(${url}) is invalid!`);
            return;
        }
        SessionStorageUtil.setSseUrl(url);

        this.client = new EventSource(url);
        this.client.addEventListener('test', function (e) {
            SseClient.handle(pushType, e.origin, e.lastEventId, e.type, e.data);
        }, false);
        this.client.onmessage = function (e) {
            SseClient.handle(pushType, e.origin, e.lastEventId, e.type, e.data);
        };
        // 如果发生通信错误（比如连接中断），就会触发error事件
        this.client.onerror = function (event) {
            Console.println("onerror");
            console.error(event);
        };
    }

    static disconnect() {
        if (this.client == null) {
            return;
        }

        this.client.close();
        this.client = null;
    }

    private static handle(pushType: number, origin: string, id: string, event: string, data: any) {
        switch (pushType) {
            case 0:
                MsgHandlerRaw.handle(origin, id, event, data);
                break;
            case 1:
                MsgHandlerBase64.handle(origin, id, event, data);
                break;
            default:
                alert(`SSE pushType(${pushType}) is invalid`);
        }
    }
}