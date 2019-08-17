let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result
        let encryptedFile = encrypt(fileBufferedData)
    }

    reader.readAsArrayBuffer(event.target.files[0])
}

window.addEventListener('load', () => {
    document.querySelector(`#fileInput`).addEventListener(`change`, changeEventForFilesLoad, false)
})