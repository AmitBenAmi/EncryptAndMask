import crypto from 'crypto'

class ECDHAlgorithm {
    constructor() {
        this.ecdhKeyPair = crypto.createECDH('secp256k1')
        this.ecdhKeyPair.generateKeys()
    }
    
    get public() {
        return this.ecdhKeyPair.getPublicKey()
    }

    decrypt(data, publicKey) {
        let secretKey = this._computeSecret(publicKey)
    }

    _computeSecret(publicKey) {
        return this.ecdhKeyPair.computeSecret(publicKey)
    }
}

export default ECDHAlgorithm