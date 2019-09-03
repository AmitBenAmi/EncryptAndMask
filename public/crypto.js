const crypto = window.crypto
const subtleCrypto = crypto.subtle
const iv = new Uint8Array([204,248,147,95,253,126,202,240,234,194,121,172,154,131,148,100])
const ELLIPTIC_CURVED_DIFFIE_HELLMAN_ALGO_NAME = 'ECDH'

const counterModeAlgorithm = {
    name: 'AES-CTR',
    counter: iv,
    length: 64
}
const ecdhGenerationKeyAlgorithm = {
    name: ELLIPTIC_CURVED_DIFFIE_HELLMAN_ALGO_NAME,
    namedCurve: 'P-256'
}

class Crypto {
    async init(publicKey) {
        this.ecdhKeyPair = await this._generateKeys()

        let importedKey = await this._importKey(publicKey)
        this.encryptionKey = await this._deriveKey(importedKey)
    }

    get publicKey() {
        return this.ecdhKeyPair.publicKey
    }

    async encrypt(dataToEncrypt) {
        try {
            let encodedData = this._arrayBufferToIntArray(dataToEncrypt)
            return await subtleCrypto.encrypt(counterModeAlgorithm, encryptionKey, encodedData)
        } catch (e) {
            console.error(`Couldn't encrypt data. Reason: ${e.message}`)
        }
    }

    async decrypt(dataToDecrypt) {
        try {
            return await subtleCrypto.decrypt(counterModeAlgorithm, encryptionKey, dataToDecrypt)
        } catch (e) {
            console.error(`Couldn't decrypt data. Reason: ${e.message}`)
        }
    }

    async _generateKeys() {
        try {
            return await subtleCrypto.generateKey(ecdhGenerationKeyAlgorithm, false, ['deriveKey'])
        } catch (e) {
            console.error(`Couldn't generate key. Reason: ${e.message}`)
        }
    }

    async _importKey(publicKey) {
        try {
            return await subtleCrypto.importKey('raw', publicKey, ecdhGenerationKeyAlgorithm, false, [])
        } catch (e) {
            console.error(`Couldn't import key. Reason: ${e.message}`)
        }
    }

    async _deriveKey(publicKey) {
        try {
            return await subtleCrypto.deriveKey({
                name: ELLIPTIC_CURVED_DIFFIE_HELLMAN_ALGO_NAME,
                public: publicKey
            }, this.ecdhKeyPair.privateKey, counterModeAlgorithm, false, ['encrypt'])
        } catch (e) {
            console.error(`Couldn't derive key. Reason: ${e.message}`)
        }
    }

    _arrayBufferToIntArray(buffer) {
        return new Uint8Array(buffer)
    }
}

export default Crypto