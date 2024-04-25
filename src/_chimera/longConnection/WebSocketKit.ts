import _ from "lodash";

export class WebSocketKit {
    /*
     * @return false: 不通过
     */
    static checkUrl(url: string): boolean {
        return _.startsWith(url, "ws://") || _.startsWith(url, "wss://")
    }

}
