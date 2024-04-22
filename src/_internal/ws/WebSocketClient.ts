import _ from "lodash";
import {Console} from "@/_internal/utils/Console";
import {SessionStorageUtil} from "@/_internal/utils/SessionStorageUtil";
import {MsgHandler0} from "@/_internal/ws/MsgHandler0";
import {MsgHandler1} from "@/_internal/ws/MsgHandler1";

export class WebSocketClient {
    private static client: WebSocket | null = null;

    static connect(url: string, pushType: number) {
        this.disconnect();

        let errorText = this.checkUrl(url);
        if (!_.isEmpty(errorText)) {
            alert(errorText);
            return;
        }
        SessionStorageUtil.setWsUrl(url);

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

    private static checkUrl(url: string): string {
        if (_.isEmpty(url)) {
            return "url is empty";
        }
        if (!_.startsWith(url, "ws://") && !_.startsWith(url, "wss://")) {
            return "prefix of url is invalid"
        }

        return "";
    }
}