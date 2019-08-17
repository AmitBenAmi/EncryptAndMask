let changeEventForFilesLoad = (event) => {
    let reader = new FileReader()

    reader.onload = (eventAfterLoad) => {
        let fileBufferedData = eventAfterLoad.target.result

        let key = document.querySelector('#key').innerHTML

        let encryptedFile = encrypt(fileBufferedData, key, true)
    }

    reader.readAsArrayBuffer(event.target.files[0])
}

window.addEventListener('load', () => {
    document.querySelector(`#fileInput`).addEventListener(`change`, changeEventForFilesLoad, false)
})