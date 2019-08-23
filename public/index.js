let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = async (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result

        let encryptedFile = await encrypt(fileBufferedData, true)
        let maskedEncryptedFile = mask(encryptedFile)

        console.log(`File encrypted, Encrypted data: ${encryptedFile}`)
    }

    reader.readAsArrayBuffer(event.target.files[0])
}

$(document).ready(() => {
    $(`#fileInput`).change(changeEventForFilesLoad)

    $.get('/public', (data) => {
        init(data.public)
        $('#fileInput').prop('disabled', false)
    })
})