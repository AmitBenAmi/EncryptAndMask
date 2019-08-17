let changeEventForFilesLoad = () => {
    let reader = new FileReader()

    reader.onload = () => {
        let arrayBuffer = this.result
    }

    reader.readAsArrayBuffer(this.files[0])
}

window.addEventListener('load', () => {
    document.querySelector(`#fileInput`).addEventListener(`change`, changeEventForFilesLoad, false)
})