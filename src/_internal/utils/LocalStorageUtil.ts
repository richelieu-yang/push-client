import {LocalStorageKit} from "@/_chimera/browser/LocalStorageKit";
import {Key} from "@/_internal/consts/key";

export class LocalStorageUtil {
    static setConnectionType(value: number) {
        LocalStorageKit.set(Key.ConnectionType, value.toString());
    }

    // 默认返回0
    static getConnectionType(): number {
        return Number(LocalStorageKit.get(Key.ConnectionType));
    }

    /*
     * WebSocket
     */
    static setWsUrl(value: string) {
        LocalStorageKit.set(Key.WsUrl, value);
    }

    /*
     * WebSocket
     */
    static getWsUrl(): string {
        return LocalStorageKit.get(Key.WsUrl);
    }

    /*
     * WebSocket
     */
    static setWsPushMessageType(value: number) {
        LocalStorageKit.set(Key.WsPushMessageType, value.toString());
    }

    /*
     * WebSocket 默认返回0
     */
    static getWsPushMessageType(): number {
        return Number(LocalStorageKit.get(Key.WsPushMessageType));
    }

    /*
     * SSE
     */
    static setSseUrl(value: string) {
        LocalStorageKit.set(Key.SseUrl, value);
    }

    /*
     * SSE
     */
    static getSseUrl(): string {
        return LocalStorageKit.get(Key.SseUrl);
    }

    /*
    * SSE
    */
    static setSsePushMessageType(value: number) {
        LocalStorageKit.set(Key.SsePushMessageType, value.toString());
    }

    /*
     * SSE 默认返回0
     */
    static getSsePushMessageType(): number {
        return Number(LocalStorageKit.get(Key.SsePushMessageType));
    }

    /*
     * Centrifuge-CredentialType
     */
    static getCentrifugeCredentialType(): string {
        return LocalStorageKit.get("Centrifuge-CredentialType") || "secret";
    }

    /*
     * Centrifuge-CredentialType
     */
    static setCentrifugeCredentialType(value: string) {
        LocalStorageKit.set("Centrifuge-CredentialType", value);
    }

    /*
     * Centrifuge-Secret
     */
    static getCentrifugeSecret(): string {
        return LocalStorageKit.get("Centrifuge-Secret") || "";
    }

    /*
     * Centrifuge-Secret
     */
    static setCentrifugeSecret(value: string) {
        LocalStorageKit.set("Centrifuge-Secret", value);
    }

    /*
     * Centrifuge-Token
     */
    static getCentrifugeToken(): string {
        return LocalStorageKit.get("Centrifuge-Token") || "";
    }

    /*
     * Centrifuge-Token
     */
    static setCentrifugeToken(value: string) {
        LocalStorageKit.set("Centrifuge-Token", value);
    }

    /*
     * Centrifuge-WsUrl
     */
    static getCentrifugeWsUrl(): string {
        return LocalStorageKit.get("Centrifuge-WsUrl") || "";
    }

    /*
     * Centrifuge-WsUrl
     */
    static setCentrifugeWsUrl(value: string) {
        LocalStorageKit.set("Centrifuge-WsUrl", value);
    }

    /*
     * Centrifuge-Alternative0-Type
     */
    static getCentrifugeAlternative0Type(): string {
        return LocalStorageKit.get("Centrifuge-Alternative0-Type") || "websocket";
    }

    /*
     * Centrifuge-Alternative0-Type
     */
    static setCentrifugeAlternative0Type(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative0-Type", value);
    }

    /*
     * Centrifuge-Alternative0-Url
     */
    static getCentrifugeAlternative0Url(): string {
        return LocalStorageKit.get("Centrifuge-Alternative0-Url") || "";
    }

    /*
     * Centrifuge-Alternative0-Url
     */
    static setCentrifugeAlternative0Url(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative0-Url", value);
    }

    /*
     * Centrifuge-Alternative1-Type
     */
    static getCentrifugeAlternative1Type(): string {
        return LocalStorageKit.get("Centrifuge-Alternative1-Type") || "";
    }

    /*
     * Centrifuge-Alternative1-Type
     */
    static setCentrifugeAlternative1Type(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative1-Type", value);
    }

    /*
     * Centrifuge-Alternative1-Url
     */
    static getCentrifugeAlternative1Url(): string {
        return LocalStorageKit.get("Centrifuge-Alternative1-Url") || "";
    }

    /*
     * Centrifuge-Alternative1-Url
     */
    static setCentrifugeAlternative1Url(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative1-Url", value);
    }

    /*
     * Centrifuge-Alternative2-Type
     */
    static getCentrifugeAlternative2Type(): string {
        return LocalStorageKit.get("Centrifuge-Alternative2-Type") || "";
    }

    /*
     * Centrifuge-Alternative2-Type
     */
    static setCentrifugeAlternative2Type(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative2-Type", value);
    }

    /*
     * Centrifuge-Alternative2-Url
     */
    static getCentrifugeAlternative2Url(): string {
        return LocalStorageKit.get("Centrifuge-Alternative2-Url") || "";
    }

    /*
     * Centrifuge-Alternative2-Url
     */
    static setCentrifugeAlternative2Url(value: string) {
        LocalStorageKit.set("Centrifuge-Alternative2-Url", value);
    }

}
