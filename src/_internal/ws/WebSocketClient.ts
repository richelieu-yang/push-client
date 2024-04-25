import _ from "lodash";
import {Console} from "@/_internal/utils/Console";
import {LocalStorageUtil} from "@/_internal/utils/LocalStorageUtil";
import {MsgHandler0} from "@/_internal/ws/MsgHandler0";
import {MsgHandler1} from "@/_internal/ws/MsgHandler1";
import {WebSocketKit} from "@/_chimera/longConnection/WebSocketKit";

export class WebSocketClient {
    private static client: WebSocket | null = null;

    static connect(url: string, pushType: number) {
        this.disconnect();

        if (!WebSocketKit.checkUrl(url)) {
            alert(`WebSocket url(${url}) is invalid!`);
            return;
        }
        LocalStorageUtil.setWsUrl(url);

        this.client = new WebSocket(url);
        this.client.binaryType = "blob"; // "arraybuffer" 或者 "blob"
        this.client.onopen = function () {
            Console.println("onopen")
        };
        this.client.onmessage = async function (e) {
            let data = e.data;

            switch (pushType) {
                case 0:
                    await MsgHandler0.handle(data);
                    break;
                case 1:
                    await MsgHandler1.handle(data);
                    break;
                default:
                    alert(`Unknown ws push type(${pushType})!`);
                    return;
            }
        };
        this.client.onerror = function (e) {
            Console.println("onerror");
            console.error(e);
        };
        this.client.onclose = function (e) {
            Console.println(`onclose: code(${e.code}), reason(${e.reason}), wasClean(${e.wasClean})`);
            console.error(e);
        };
    }

    static send(messageText: string) {
        if (_.isEmpty(messageText)) {
            alert("Message is empty!");
            return
        }
        if (!this.client || this.client.readyState != WebSocket.OPEN) {
            alert("WebSocket isn't ready!");
            return
        }

        this.client.send(messageText);
        Console.println(`send a message: ${messageText}`)
    }

    static disconnect() {
        if (this.client == null) {
            return;
        }

        this.client.close();
        this.client = null;
    }

}
