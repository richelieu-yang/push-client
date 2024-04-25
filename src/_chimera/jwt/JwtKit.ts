/*
 * jose: https://www.npmjs.com/package/jose
 * jsonwebtoken库不能用（貌似需要nodejs环境）.
 */
import * as jose from 'jose';

export class JwtKit {
    /*
     * 参考: https://github.com/panva/jose/blob/HEAD/docs/classes/jwt_sign.SignJWT.md
     */
    static sign(payload: any, alg: string = "HS256", secret: string) {
        const secretUA = new TextEncoder().encode(secret)

        return new jose.SignJWT(payload)
            .setProtectedHeader({alg})
            .setIssuedAt()
            // .setIssuer('urn:example:issuer')
            // .setAudience('urn:example:audience')
            // .setExpirationTime('2h')
            .sign(secretUA);

        //     return new jose.SignJWT({'urn:example:claim': true})
        //         .setProtectedHeader({alg})
        //         .setIssuedAt()
        //         .setIssuer('urn:example:issuer')
        //         .setAudience('urn:example:audience')
        //         .setExpirationTime('2h')
        //         .sign(secretUA);
    }

}
