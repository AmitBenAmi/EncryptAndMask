const p = 17
const g = 9
const a = 15
const A = Math.pow(g, a) % p

class DHAlgorithm {
    static get public() {
        return A
    }
    
    calculateDHPublicFromOtherSide = (valB) => {
        return Math.pow(valB, a) % p
    }
}

export default DHAlgorithm