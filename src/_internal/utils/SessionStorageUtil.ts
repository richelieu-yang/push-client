import {SessionStorageKit} from "@/_chimera/browser/SessionStorageKit";
import {Key} from "@/_internal/consts/key";

export class SessionStorageUtil {
    static setConnectionType(value: number) {
        SessionStorageKit.set(Key.ConnectionType, value.toString());
    }

    // 默认返回0
    static getConnectionType(): number {
        return Number(SessionStorageKit.get(Key.ConnectionType));
    }

    /*
     * WebSocket
     */
    static setWsUrl(value: string) {
        SessionStorageKit.set(Key.WsUrl, value);
    }

    /*
     * WebSocket
     */
    static getWsUrl(): string {
        return SessionStorageKit.get(Key.WsUrl);
    }

    /*
     * WebSocket
     */
    static setWsPushMessageType(value: number) {
        SessionStorageKit.set(Key.WsPushMessageType, value.toString());
    }

    /*
     * WebSocket 默认返回0
     */
    static getWsPushMessageType(): number {
        return Number(SessionStorageKit.get(Key.WsPushMessageType));
    }

    /*
     * SSE
     */
    static setSseUrl(value: string) {
        SessionStorageKit.set(Key.SseUrl, value);
    }

    /*
     * SSE
     */
    static getSseUrl(): string {
        return SessionStorageKit.get(Key.SseUrl);
    }

    /*
    * SSE
    */
    static setSsePushMessageType(value: number) {
        SessionStorageKit.set(Key.SsePushMessageType, value.toString());
    }

    /*
     * SSE 默认返回0
     */
    static getSsePushMessageType(): number {
        return Number(SessionStorageKit.get(Key.SsePushMessageType));
    }

    /*
     * Centrifuge-CredentialFlag
     */
    static getCentrifugeCredentialFlag(): string {
        return SessionStorageKit.get("Centrifuge-CredentialFlag") || "secret";
    }

    /*
     * Centrifuge-CredentialFlag
     */
    static setCentrifugeCredentialFlag(value: string) {
        SessionStorageKit.set("Centrifuge-CredentialFlag", value);
    }

    /*
     * Centrifuge-Secret
     */
    static getCentrifugeSecret(): string {
        return SessionStorageKit.get("Centrifuge-Secret") || "";
    }

    /*
     * Centrifuge-Secret
     */
    static setCentrifugeSecret(value: string) {
        SessionStorageKit.set("Centrifuge-Secret", value);
    }

    /*
     * Centrifuge-Token
     */
    static getCentrifugeToken(): string {
        return SessionStorageKit.get("Centrifuge-Token") || "";
    }

    /*
     * Centrifuge-Token
     */
    static setCentrifugeToken(value: string) {
        SessionStorageKit.set("Centrifuge-Token", value);
    }

    /*
     * Centrifuge-WsUrl
     */
    static getCentrifugeWsUrl(): string {
        return SessionStorageKit.get("Centrifuge-WsUrl") || "";
    }

    /*
     * Centrifuge-WsUrl
     */
    static setCentrifugeWsUrl(value: string) {
        SessionStorageKit.set("Centrifuge-WsUrl", value);
    }

    /*
     * Centrifuge-Alternative0-Type
     */
    static getCentrifugeAlternative0Type(): string {
        return SessionStorageKit.get("Centrifuge-Alternative0-Type") || "";
    }

    /*
     * Centrifuge-Alternative0-Type
     */
    static setCentrifugeAlternative0Type(value: string) {
        SessionStorageKit.set("Centrifuge-Alternative0-Type", value);
    }

    /*
     * Centrifuge-Alternative0-Url
     */
    static getCentrifugeAlternative0Url(): string {
        return SessionStorageKit.get("Centrifuge-Alternative0-Url") || "";
    }

    /*
     * Centrifuge-Alternative0-Url
     */
    static setCentrifugeAlternative0Url(value: string) {
        SessionStorageKit.set("Centrifuge-Alternative0-Url", value);
    }

    /*
     * Centrifuge-Alternative1-Type
     */
    static getCentrifugeAlternative1Type(): string {
        return SessionStorageKit.get("Centrifuge-Alternative1-Type") || "";
    }

    /*
     * Centrifuge-Alternative1-Type
     */
    static setCentrifugeAlternative1Type(value: string) {
        SessionStorageKit.set("Centrifuge-Alternative1-Type", value);
    }

    /*
     * Centrifuge-Alternative1-Url
     */
    static getCentrifugeAlternative1Url(): string {
        return SessionStorageKit.get("Centrifuge-Alternative1-Url") || "";
    }

    /*
     * Centrifuge-Alternative1-Url
     */
    static setCentrifugeAlternative1Url(value: string) {
        SessionStorageKit.set("Centrifuge-Alternative1-Url", value);
    }

    // /*
    //  * Centrifuge-
    //  */
    // static getCentrifuge(): string {
    //     return SessionStorageKit.get("") || "";
    // }
    //
    // /*
    //  * Centrifuge-
    //  */
    // static setCentrifuge(value: string) {
    //     SessionStorageKit.set("", value);
    // }

}
