const p = 17
const g = 9
const a = 15
const A = Math.pow(g, a) % p

class DHAlgorithm {
    static get public() {
        return A
    }
    
    calculateKey_a = (B) => {
        return Math.pow(B, a) % p
    }
}

export default DHAlgorithm