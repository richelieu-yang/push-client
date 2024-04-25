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
     * Centrifuge CredentialFlag
     */
    static getCentrifugeCredentialFlag(): string {
        return ""
    }

    /*
     * Centrifuge CredentialFlag
     */
    static setCentrifugeCredentialFlag(value: string) {

    }

    /*
     * Centrifuge Secret
     */
    static getCentrifugeSecret(): string {
        return ""
    }

    /*
     * Centrifuge Secret
     */
    static setCentrifugeSecret(value: string) {

    }

    /*
     * Centrifuge Token
     */
    static getCentrifugeToken(): string {
        return ""
    }

    /*
     * Centrifuge Token
     */
    static setCentrifugeToken(value: string) {

    }

    /*
     * Centrifuge WsUrl
     */
    static getCentrifugeWsUrl(): string {
        return ""
    }

    /*
     * Centrifuge Fallback
     */
    static setCentrifugeWsUrl(value: string) {

    }

    /*
     * Centrifuge Fallback
     */
    static getCentrifugeFallback(): string {
        return ""
    }

    /*
     * Centrifuge
     */
    static setCentrifugeFallback(value: string) {

    }

    /*
     * Centrifuge
     */
    static getCentrifuge(): string {
        return ""
    }

    /*
     * Centrifuge
     */
    static setCentrifuge(value: string) {

    }

}
