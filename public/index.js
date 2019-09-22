import Crypto from './crypto.js'
import Mask from './mask.js'
const maskValue = 117
let crypto
let masker

let onFileLoad = async (eventAfterLoad) => {
    let fileBufferedData = eventAfterLoad.target.result

    let encryptedFile = await crypto.encrypt(fileBufferedData)
    console.info(`File is encrypted`)

    let maskedEncryptedFile = masker.digest(encryptedFile)
    console.info(`File is masked`)

    let publicKey = await crypto.publicKey()
    let publicKeyAsUInt8Array = new Uint8Array(publicKey)
    var maskedFileToTransfer = await new Blob([publicKeyAsUInt8Array, maskedEncryptedFile]).arrayBuffer()

    let response = await $.ajax({
        url: '/transfer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Array.from(new Uint8Array(maskedFileToTransfer)))
    })
}

let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()
    reader.onload = onFileLoad
    reader.readAsArrayBuffer(event.target.files[0])
}

$(document).ready(async () => {
    let response = await $.get('/publicKey')
    crypto = new Crypto()
    await crypto.init(new Uint8Array(response.publicKey.data).buffer)
    masker = new Mask(maskValue)

    $(`#fileInput`).change(changeEventForFilesLoad)
    $('#fileInput').prop('disabled', false)
})