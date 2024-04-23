import _ from "lodash";
import {Centrifuge} from 'centrifuge';

export class CentrifugeClient {
    private static client: Centrifuge | null = null;

    static connect(url: string) {
        this.disconnect();

        let errorText = this.checkUrl(url);
        if (!_.isEmpty(errorText)) {
            alert(errorText);
            return;
        }

    }

    static disconnect() {
        if (this.client == null) {
            return;
        }

        // TODO: 关闭连接
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
