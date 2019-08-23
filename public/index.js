let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = async (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result

        let encryptedFile = await encrypt(fileBufferedData, true)
        console.log(`File is encrypted`)

        let maskedEncryptedFile = mask(encryptedFile)
        console.log(`File is masked`)

        let exposedBValue = `{${getMyPublic()}}`
        var maskedFileToTransfer = await new Blob([exposedBValue, maskedEncryptedFile]).arrayBuffer()

        let response = await $.post('/transfer', {
            fileBuffer: maskedFileToTransfer
        })
    }

    reader.readAsArrayBuffer(event.target.files[0])
}

$(document).ready(async () => {
    $(`#fileInput`).change(changeEventForFilesLoad)

    let result = await $.get('/public')
    init(result.public)
    $('#fileInput').prop('disabled', false)
})