class Mask {
    constructor(maskValue) {
        this.maskValue = maskValue
    }

    digest(dataToMask) {
        let maskedArray = new Uint8Array(dataToMask).map((valueBeforeMask) => {
            return valueBeforeMask ^ this.maskValue
        })

        return maskedArray
    }
}

export default Mask