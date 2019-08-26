import crypto from 'crypto'

class ECDHAlgorithm {
    constructor() {
        this.ecdh = crypto.createECDH('secp256k1')
        this.ecdh.generateKeys()
    }
    
    get public() {
        return this.ecdh.getPublicKey()
    }

    decrypt(data, publicKey) {
        let secretKey = this._computeSecret(publicKey)
    }

    _computeSecret(publicKey) {
        return this.ecdh.computeSecret(publicKey)
    }
}

export default ECDHAlgorithm