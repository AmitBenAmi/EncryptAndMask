const crypto = window.crypto
const iv = new Uint8Array([204,248,147,95,253,126,202,240,234,194,121,172,154,131,148,100])
const counterModeAlgorithm = {
    name: 'AES-CTR',
    counter: iv,
    length: 64
}
const subtleCrypto = crypto.subtle
const maskerValue = 123
const p = new bigInt(7577) // Must be prime
const g = new bigInt(1367)
const b = 5
const gPower_b_mod_p = g.pow(b).mod(p)
let A

let init = (public) => {
    A = new bigInt(public)
}

let getMyPublic = () => {
    return gPower_b_mod_p
}

let calculateKey_b = () => {
    return A.pow(b).mod(p)
}

let encode = (dataToEncode) => {
    let encoder = new TextEncoder()
    return encoder.encode(dataToEncode)
}

let decode = (dataToDecode) => {
    let decoder = new TextDecoder()
    return decoder.decode(dataToDecode)
}

let arrayBufferToIntArray = (buffer) => {
    return new Uint8Array(buffer)
}

let createKey = async (key, usages) => {
    let encodedKey = encode(key)
    let algorithm = {
        name: 'AES-CTR'
    }

    try {
        let rawKey = await subtleCrypto.digest('SHA-256', encodedKey)

        try {
            return await subtleCrypto.importKey('raw', rawKey, algorithm, false, usages)
        } catch (e) {
            console.error(`Couldn't import key. Reason: ${e.message}`)
        }
    } catch (e) {
        console.error(`Couldn't digest key. Reason: ${e.message}`)
    }
}

let createEncryptionKey = async (key) => {
    return await createKey(key, ['encrypt'])
}

let createDecryptionKey = async (key) => {
    return await createKey(key, ['decrypt'])
}

let encrypt = async (dataToEncrypt, isBuffered) => {
    let encodedData

    if (isBuffered) {
        encodedData = arrayBufferToIntArray(dataToEncrypt)
    } else {
        encodedData = encode(dataToEncrypt)
    }

    let key = calculateKey_b()

    let encryptionKey = await createEncryptionKey(key)

    try {
        return await subtleCrypto.encrypt(counterModeAlgorithm, encryptionKey, encodedData)
    } catch (e) {
        console.error(`Couldn't encrypt data. Reason: ${e.message}`)
    }
}

let decrypt = async (dataToDecrypt, key) => {
    let decryptionKey = await createDecryptionKey(key)

    try {
        return await subtleCrypto.decrypt(counterModeAlgorithm, decryptionKey, dataToDecrypt)
    } catch (e) {
        console.error(`Couldn't decrypt data. Reason: ${e.message}`)
    }
}

let mask = (dataToMaskAsArrayBuffer) => {
    let maskedArray = new Uint8Array(dataToMaskAsArrayBuffer.byteLength)

    new Uint8Array(dataToMaskAsArrayBuffer).forEach((value, index) => {
        maskedArray[index] = value ^ maskerValue
    })

    return maskedArray.buffer
}