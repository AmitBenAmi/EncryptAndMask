let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result

        let encryptedFile = encrypt(fileBufferedData, true)
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