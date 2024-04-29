import {JwtKit} from "@/_chimera/jwt/JwtKit";

export class CentrifugeKit {
    /*
     * Generate sample connection JWT for user.
     *
     * @param alg e.g."HS256"
     */
    static genToken(payload: any, alg: string, secret: string, expirationTime: string, user: string) {
        if (!payload) {
            payload = {}
        }
        payload.sub = user;
        // payload.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

        return JwtKit.sign(payload, alg, secret, expirationTime);
    }

    /*
     * Generate sample subscription JWT for user.
     *
     * @param alg e.g."HS256"
     */
    static genSubToken(payload: any, alg: string, secret: string, expirationTime: string, user: string, channel: string) {
        if (!payload) {
            payload = {}
        }
        payload.sub = user;
        payload.channel = channel;
        // payload.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

        return JwtKit.sign(payload, alg, secret, expirationTime);
    }

}
