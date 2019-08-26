import crypto from 'crypto'

class ECDHAlgorithm {
    constructor() {
        this.ecdh = crypto.createECDH('secp256k1')
        this.ecdh.generateKeys()

        this.otherEcdh = crypto.createECDH('secp256k1')
        this.otherEcdh.generateKeys()
    }
    
    get public() {
        return keyPair.getPublicKey()
    }

    decrypt(publicKey) {
        this.ecdh.decrypt
    }
}

export default ECDHAlgorithm