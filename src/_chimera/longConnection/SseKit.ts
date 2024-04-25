import _ from "lodash";

export class SseKit {
    /*
     * @return false: 不通过
     */
    static checkUrl(url: string): boolean {
        return _.startsWith(url, "http://") || _.startsWith(url, "https://")
    }

}
