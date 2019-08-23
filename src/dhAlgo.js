const bigInt = require('big-integer')

const p = new bigInt(7577) // Must be prime
const g = new bigInt(1367)
const a = 16
const A = g.pow(a).mod(p)

class DHAlgorithm {
    static get public() {
        return A
    }
    
    calculateKey_a = (B) => {
        return new bigInt(B).pow(a).mod(p)
    }
}

export default DHAlgorithm