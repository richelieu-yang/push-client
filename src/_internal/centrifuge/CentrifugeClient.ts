import _ from "lodash";
import type {
    ConnectedContext,
    ConnectingContext,
    DisconnectedContext,
    ErrorContext,
    JoinContext,
    LeaveContext,
    Options,
    PublicationContext,
    SubscribedContext,
    SubscribingContext,
    SubscriptionErrorContext,
    TransportEndpoint,
    UnsubscribedContext
} from "centrifuge";
import {Centrifuge} from 'centrifuge';
import {Centrifuge as ProtobufCentrifuge} from 'centrifuge/build/protobuf';
import {Console} from "@/_internal/utils/Console";
import {WebSocketKit} from "@/_chimera/longConnection/WebSocketKit";
import {SseKit} from "@/_chimera/longConnection/SseKit";
import {Uint8ArrayKit} from "@/_chimera/type/Uint8ArrayKit";
import {StringKit} from "@/_chimera/type/StringKit";
import {LocalStorageUtil} from "@/_internal/utils/LocalStorageUtil";
import {UuidKit} from "@/_chimera/id/UuidKit";
import {CentrifugeKit} from "@/_chimera/longConnection/CentrifugeKit";

export class CentrifugeClient {
    private static client: Centrifuge | ProtobufCentrifuge | null = null;

    static debug: boolean = LocalStorageUtil.getCentrifugeDebug();
    static protocol: string = LocalStorageUtil.getCentrifugeProtocol();
    static user: string = LocalStorageUtil.getCentrifugeUser();
    static channel: string = LocalStorageUtil.getCentrifugeChannel();
    static secret: string = LocalStorageUtil.getCentrifugeSecret();
    static rpcMethod: string = LocalStorageUtil.getCentrifugeRpcMethod();
    static rpcData: string = LocalStorageUtil.getCentrifugeRpcData();

    static async connect(endpoints: Array<TransportEndpoint>) {
        this.disconnect(false);

        if (_.isEmpty(endpoints)) {
            alert(`You need at least one valid TransportEndpoint!`);
            return;
        }
        if (_.isEmpty(this.secret)) {
            alert("secret is empty!");
            return;
        }
        if (_.isEmpty(this.channel)) {
            alert("channel is empty!");
            return;
        }
        let user: string = this.user;
        if (_.isEmpty(user)) {
            user = UuidKit.v4();
        }

        let connectToken = await CentrifugeKit.genToken({}, "HS256", this.secret, "24h", user);
        let subToken = await CentrifugeKit.genSubToken({}, "HS256", this.secret, "24h", user, this.channel);
        Console.println(`user: [${user}]`);
        Console.println(`channel: [${this.channel}]`);
        Console.println(`secret: [${this.secret}]`);
        Console.println(`token: [${connectToken}]`);
        Console.println(`subToken: [${subToken}]`);
        let emulationEndpoint = this.getEmulationEndpoint(endpoints);
        Console.println(`emulation endpoint: "${emulationEndpoint}"`);

        let opts: Partial<Options> = {
            debug: this.debug,
            token: connectToken,
            data: null,
            emulationEndpoint: emulationEndpoint,
            // websocket: WebSocket,
            /*
             * 客户端的timeout
             * timeout for operations in milliseconds
             * 默认: 约5s（自测）
             * 单位: ms
             *
             * !!!:
             * (1) Richelieu: 建议采纳 timeout == centrifugo
             * (2) 如果 timeout <= centrifugo 的 proxy_rpc_timeout 配置项，前端的超时报错: {"code":1,"message":"timeout"}
             * (3) 如果 timeout > centrifugo 的 proxy_rpc_timeout 配置项，前端的超时报错: {"code":100,"message":"internal server error","temporary":true}
             */
            timeout: 1000 * 30,
        };


        if (this.isProtobuf()) {
            this.client = new ProtobufCentrifuge(endpoints, opts);
        } else {
            this.client = new Centrifuge(endpoints, opts);
        }
        // this.client.setToken("<token>");
        this.client.on('connecting', function (ctx: ConnectingContext) {
            console.log("ConnectingContext", ctx);
            Console.println(`[client-connecting] code: ${ctx.code}, reason: ${ctx.reason}`);
        });
        this.client.on('connected', function (ctx: ConnectedContext) {
            console.log("ConnectedContext", ctx);
            Console.println(`+++ [client-connected] client: ${ctx.client}, transport: ${ctx.transport}`);
        });
        this.client.on('disconnected', function (ctx: DisconnectedContext) {
            console.log("DisconnectedContext", ctx);
            Console.println(`--- [client-disconnected] code: ${ctx.code}, reason: ${ctx.reason}`);

            // 长连接彻底结束
            CentrifugeClient.client = null;
        });
        this.client.on('error', function (ctx: ErrorContext) {
            console.log("ErrorContext", ctx);
            Console.println(`--- [client-error] type: ${ctx.type}, transport: ${ctx.transport}, error.code: ${ctx.error.code}, error.message: ${ctx.error.message}`);
        });

        let sub = this.client.newSubscription(this.channel, {
            token: subToken,
        });
        sub.on("subscribing", function (ctx: SubscribingContext) {
            console.log("SubscribingContext", ctx);

            Console.println(`[sub-subscribing] code: ${ctx.code}, reason: ${ctx.reason}`);
        });
        sub.on("subscribed", function (ctx: SubscribedContext) {
            console.log("SubscribedContext", ctx);

            Console.println(`+++ [sub-subscribed] channel: ${ctx.channel}`);
        });
        sub.on("unsubscribed", function (ctx: UnsubscribedContext) {
            console.log("UnsubscribedContext", ctx);

            Console.println(`--- [sub-unsubscribed] channel: ${ctx.channel}, code: ${ctx.code}, reason: ${ctx.reason}`);
        });
        sub.on("error", function (ctx: SubscriptionErrorContext) {
            console.log("SubscriptionErrorContext", ctx);

            Console.println(`--- [sub-error] channel: ${ctx.channel}, type: ${ctx.type}, error.code: ${ctx.error.code}, error.message: ${ctx.error.message}`);
        });
        sub.on("publication", function (ctx: PublicationContext) {
            console.log("PublicationContext", ctx);

            if (typeof ctx.data === "string") {
                Console.println(`[sub-publication] channel: ${ctx.channel}, content(string): ${ctx.data}`);
                return
            } else if (ctx.data instanceof Uint8Array) {
                let text = Uint8ArrayKit.toString(ctx.data);
                Console.println(`[sub-publication] channel: ${ctx.channel}, content(Uint8Array): ${text}`);
                return
            }
            Console.println(`[sub-publication] channel: ${ctx.channel}, content(object): ${JSON.stringify(ctx.data)}`);
        });
        sub.on("join", function (ctx: JoinContext) {
            console.log("JoinContext", ctx);

            Console.println(`[sub-join] channel: ${ctx.channel}, info.user: ${ctx.info.user}, info.client: ${ctx.info.client}`);
        });
        sub.on("leave", function (ctx: LeaveContext) {
            console.log("LeaveContext", ctx);

            Console.println(`[sub-leave] channel: ${ctx.channel}, info.user: ${ctx.info.user}, info.client: ${ctx.info.client}`);
        });

        this.client.connect();
        sub.subscribe();
    }

    static publish(data: any) {
        if (!data) {
            return;
        }
        if (this.client == null || this.client.state != "connected") {
            return;
        }

        this.client.publish(this.channel, data);
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

    static rpc() {
        if (this.client == null) {
            alert("No connection now!");
            return;
        }

        let method: string = this.rpcMethod,
            data: any;

        /* 取值 */
        if (_.isEmpty(this.rpcMethod)) {
            alert("rpc method is empty!");
            return;
        }
        if (_.isEmpty(this.rpcData)) {
            alert("rpc data is empty!");
            return;
        }
        try {
            data = JSON.parse(this.rpcData)
        } catch (e) {
            alert("rpc data is a json string!");
            return;
        }
        Console.println(`[rpc] method: ${method}, data: ${JSON.stringify(data)}`);

        let finalData: any;
        if (this.isProtobuf()) {
            // Make sure data is properly encoded when calling methods of Centrifuge Protobuf-based instance.
            // 使用 protobuf 协议，需要额外编码为Uint8Array实例
            finalData = StringKit.toUint8Array(JSON.stringify(data));
        } else {
            finalData = data;
        }
        this.client.rpc(method, finalData).then(function (rpcResult) {
            let data = rpcResult.data;
            let response: any;

            if (data instanceof Uint8Array) {
                // protocol: Protobuf binary
                let json = Uint8ArrayKit.toString(data);
                response = JSON.parse(json);
            } else {
                // protocol: JSON
                response = data;
            }
            console.log('[rpc] result data:', data);
            Console.println(`[rpc] response: ${JSON.stringify(response)}`);
        }, function (err) {
            console.log('[rpc] error:', err);
            Console.println(`[rpc] error: ${JSON.stringify(err)}`)
        });
    }

    private static isProtobuf(): boolean {
        return this.protocol === "protobuf"
    }

    /*
     * @return 可能为""
     */
    private static getEmulationEndpoint(endpoints: Array<TransportEndpoint>): string {
        for (let te of endpoints) {
            switch (te.transport) {
                case "http_stream":
                case "sse":
                    let tmp = te.endpoint,
                        i = tmp.indexOf("/connection");
                    if (i != -1) {
                        tmp = tmp.substring(0, i);
                        tmp += "/emulation";
                    } else {
                        // Richelieu: 理论上不会走到此处，走到此处就有问题了!!!
                        tmp = "";
                        console.error("emulation endpoint is empty!!!")
                    }
                    return tmp;
                default:
                // do nothing
            }
        }
        return "";
    }

}
