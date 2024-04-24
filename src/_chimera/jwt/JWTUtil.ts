import {sign} from "jsonwebtoken";

export class JWTUtil {
    /*
     * 默认: HS256
     */
    static sign(payload: any, secret: string): string {
        return sign(payload, secret);
    }

}
