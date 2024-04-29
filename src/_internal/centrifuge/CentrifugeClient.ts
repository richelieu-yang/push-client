import type {Options, TransportEndpoint} from "centrifuge";
import {Centrifuge} from 'centrifuge';
import {Console} from "@/_internal/utils/Console";
import {WebSocketKit} from "@/_chimera/longConnection/WebSocketKit";
import {SseKit} from "@/_chimera/longConnection/SseKit";

export class CentrifugeClient {
    private static client: Centrifuge | null = null;

    static defChannel: string = "test-channel";

    static connect(endpoints: Array<TransportEndpoint>, token: string, subToken: string) {
        this.disconnect(false);

        Console.println(`token: ${token}`);
        Console.println(`subToken: ${subToken}`);

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
        this.client.on('error', function (ctx) {
            Console.println("error");
        });
        this.client.on('disconnected', function (ctx) {
            Console.println("disconnected");
        });

        let sub = this.client.newSubscription(this.defChannel, {
            token: subToken,
        });
        sub.on("publication", function (ctx) {
            Console.println(`publication: ${ctx.data}}`);
        });
        sub.on("join", function (ctx) {
            Console.println(`join`);
        });
        sub.on("leave", function (ctx) {
            Console.println(`leave`);
        });
        sub.on("error", function (ctx) {
            Console.println(`error`);
        });
        sub.on("subscribing", function (ctx) {
            Console.println(`subscribing`);
        });
        sub.on("subscribed", function (ctx) {
            Console.println(`subscribed`);
        });
        sub.on("unsubscribed", function (ctx) {
            Console.println(`unsubscribed`);
        });

        sub.subscribe();
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

        let subs = this.client.subscriptions();
        for (const [i, sub] of Object.entries(subs)) {
            sub.unsubscribe();
        }
        this.client.disconnect();
        this.client = null;
    }

    static checkUrl(url: string): boolean {
        return WebSocketKit.checkUrl(url) || SseKit.checkUrl(url);
    }

}
