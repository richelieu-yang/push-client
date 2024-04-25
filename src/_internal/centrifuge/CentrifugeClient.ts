import _ from "lodash";
import type {TransportEndpoint} from "centrifuge";
import {Centrifuge} from 'centrifuge';
import {Console} from "@/_internal/utils/Console";

export class CentrifugeClient {
    private static client: Centrifuge | null = null;

    static connect(url: string) {
        this.disconnect();

        // let errorText = this.checkUrl(url);
        // if (!_.isEmpty(errorText)) {
        //     alert(errorText);
        //     return;
        // }

        const transports: TransportEndpoint[] = [
            {
                transport: 'websocket',
                endpoint: 'ws://127.0.0.1:8000/connection/websocket'
            },
            // {
            //     transport: 'http_stream',
            //     endpoint: 'http://example.com/connection/http_stream'
            // },
            // {
            //     transport: 'sse',
            //     endpoint: 'http://example.com/connection/sse'
            // }
        ];
        this.client = new Centrifuge(transports);
        // this.client.setToken("<token>");
        this.client.on('connected', function (ctx) {
            Console.println("connected");
        });
        this.client.on('connecting', function (ctx) {
            Console.println("connecting");
        });
        this.client.on('disconnected', function (ctx) {
            Console.println("disconnected");
        });
        this.client.connect();
    }

    static send() {
        // TODO: https://github.com/centrifugal/centrifuge-js?tab=readme-ov-file#send-method

    }

    static disconnect() {
        if (this.client == null) {
            return;
        }

        this.client.disconnect();
        this.client = null;
    }

    private static checkUrl(url: string): string {
        if (_.isEmpty(url)) {
            return "url is empty";
        }
        // if (!_.startsWith(url, "ws://") && !_.startsWith(url, "wss://")) {
        //     return "prefix of url is invalid"
        // }

        return "";
    }

}
