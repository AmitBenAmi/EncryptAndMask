let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result

        let encryptedFile = encrypt(fileBufferedData, key, true)
    }

    reader.readAsArrayBuffer(event.target.files[0])
}

$(document).ready(() => {
    $(`#fileInput`).on(`change`, changeEventForFilesLoad, false)
})