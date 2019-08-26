import Crypto from './crypto.js'
import Mask from './mask.js'
const maskValue = 4233
let crypto
let masker

let onFileLoad = async (eventAfterLoad) => {
    let fileBufferedData = eventAfterLoad.target.result

    let encryptedFile = await crypto.encrypt(fileBufferedData)
    console.info(`File is encrypted`)

    let maskedEncryptedFile = masker.digest(encryptedFile)
    console.info(`File is masked`)

    let publicKey = crypto.publicKey
    var maskedFileToTransfer = await new Blob([publicKey, maskedEncryptedFile]).arrayBuffer()

    let response = await $.post('/transfer', {
        //fileBuffer: maskedFileToTransfer
        fileBuffer: 'hello'
    })
}

let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()
    reader.onload = onFileLoad
    reader.readAsArrayBuffer(event.target.files[0])
}

$(document).ready(async () => {
    let publicKey = await $.get('/publicKey')
    crypto = new Crypto(publicKey)
    masker = new Mask(maskValue)

    $(`#fileInput`).change(changeEventForFilesLoad)
    $('#fileInput').prop('disabled', false)
})