import type {Options, TransportEndpoint} from "centrifuge";
import {Centrifuge} from 'centrifuge';
import {Centrifuge as ProtobufCentrifuge} from 'centrifuge/build/protobuf';
import {Console} from "@/_internal/utils/Console";
import {WebSocketKit} from "@/_chimera/longConnection/WebSocketKit";
import {SseKit} from "@/_chimera/longConnection/SseKit";
import {Uint8ArrayKit} from "@/_chimera/type/Uint8ArrayKit";

export class CentrifugeClient {
    private static client: Centrifuge | ProtobufCentrifuge | null = null;

    static defChannel: string = "test";

    static connect(protocol: string, endpoints: Array<TransportEndpoint>, user: string, token: string, subToken: string) {
        this.disconnect(false);

        Console.println(`user: ${user}`);
        Console.println(`token: ${token}`);
        Console.println(`subToken: ${subToken}`);

        let opts: Partial<Options> = {
            debug: true,
            token: token,
            emulationEndpoint: "http://localhost:8000/emulation",
            websocket: WebSocket
        };

        if (protocol === "protobuf") {
            this.client = new ProtobufCentrifuge(endpoints, opts);
        } else {
            this.client = new Centrifuge(endpoints, opts);
        }
        // this.client.setToken("<token>");
        this.client.on('connecting', function (ctx) {
            Console.println(`connecting: ${ctx.code}, ${ctx.reason}`);
        });
        this.client.on('connected', function (ctx) {
            Console.println(`connected over ${ctx.transport}`);
        });
        this.client.on('disconnected', function (ctx) {
            Console.println(`disconnected: ${ctx.code}, ${ctx.reason}`);
        });
        this.client.on('error', function (ctx) {
            Console.println(`error: type(${ctx.type})、transport(${ctx.transport})、error.code(${ctx.error.code})、error.message(${ctx.error.message})`);
        });

        let sub = this.client.newSubscription(this.defChannel, {
            token: subToken,
        });
        sub.on("publication", function (ctx) {
            console.log(ctx.data);

            if (typeof ctx.data === "string") {
                Console.println(`publication: ${ctx.data}`);
                return
            } else if (ctx.data instanceof Uint8Array) {
                let text = Uint8ArrayKit.toString(ctx.data);
                Console.println(`publication: ${text}`);
                return
            }

            Console.println(`publication: ${JSON.stringify(ctx.data)}`);
        });
        sub.on("join", function (ctx) {
            Console.println(`User(user: ${ctx.info.user}, client: ${ctx.info.client}) joins.`);
        });
        sub.on("leave", function (ctx) {
            Console.println(`User(user: ${ctx.info.user}, client: ${ctx.info.client}) leaves.`);
        });
        sub.on("error", function (ctx) {
            Console.println(`error`);
        });
        sub.on("subscribing", function (ctx) {
            Console.println(`subscribing: ${ctx.code}, ${ctx.reason}`);
        });
        sub.on("subscribed", function (ctx) {
            Console.println(`subscribed`);
        });
        sub.on("unsubscribed", function (ctx) {
            Console.println(`unsubscribed: ${ctx.code}, ${ctx.reason}`);
        });

        sub.subscribe();
        this.client.connect();
    }

    static publish(data: any) {
        if (!data) {
            return;
        }
        if (this.client == null || this.client.state != "connected") {
            return;
        }

        this.client.publish(this.defChannel, data);
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

    static rpc(method: string, data: any) {
        if (this.client == null) {
            alert("No connection now!");
            return;
        }

        this.client.rpc(method, data).then(function (rpcResult) {
            let data = rpcResult.data;
            console.log('rpc result data:', data);

            let response: any;
            if (data instanceof Uint8Array) {
                // protocol: Protobuf binary
                let json = Uint8ArrayKit.toString(data);
                response = JSON.parse(json);
            } else {
                // protocol: JSON
                response = data;
            }
            Console.println(`rpc response: ${JSON.stringify(response)}`);
        }, function (err) {
            console.log('rpc error:', err);
        });
    }

}
