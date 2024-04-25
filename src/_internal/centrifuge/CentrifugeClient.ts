import type {Options, TransportEndpoint} from "centrifuge";
import {Centrifuge} from 'centrifuge';
import {Console} from "@/_internal/utils/Console";
import {WebSocketKit} from "@/_chimera/longConnection/WebSocketKit";
import {SseKit} from "@/_chimera/longConnection/SseKit";

export class CentrifugeClient {
    private static client: Centrifuge | null = null;

    static connect(endpoints: Array<TransportEndpoint>, token: string) {
        this.disconnect(false);

        let opts: Partial<Options> = {
            debug: true,
            token: token,
        };
        this.client = new Centrifuge(endpoints, opts);
        // this.client.setToken("<token>");
        this.client.on('connecting', function (ctx) {
            Console.println("connecting");
        });
        this.client.on('connected', function (ctx) {
            Console.println("connected");
        });
        this.client.on('disconnected', function (ctx) {
            Console.println("disconnected");
        });
        this.client.connect();
    }

    static send() {
        // TODO: https://github.com/centrifugal/centrifuge-js?tab=readme-ov-file#send-method

    }

    static disconnect(alertFlag: boolean = true) {
        if (this.client == null) {
            if (alertFlag) {
                alert("No connection now!");
            }
            return;
        }

        this.client.disconnect();
        this.client = null;
    }

    static checkUrl(url: string): boolean {
        return WebSocketKit.checkUrl(url) || SseKit.checkUrl(url);
    }

}
