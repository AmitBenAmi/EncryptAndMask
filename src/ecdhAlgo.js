import bigInt from 'big-integer'
import crypto from 'crypto'

const p = new bigInt(7577) // Must be prime
const g = new bigInt(1367)
const a = 16
const A = g.pow(a).mod(p)

class ECDHAlgorithm {
    constructor() {
        this.ecdh = crypto.createECDH('secp256k1')
        this.ecdh.generateKeys()
    }
    
    get public() {
        return keyPair.getPublicKey()
    }
    
    calculateKey_a = (B) => {
        return new bigInt(B).pow(a).mod(p)
    }
}

export default DHAlgorithm