const p = 17
const g = 9
const a = 15
const gPower_a_mod_p = Math.pow(g, a) % p

class DHAlgorithm {
    static get public() {
        return gPower_a_mod_p
    }
    
    calculateDHPublicFromOtherSide = (valB) => {
        return Math.pow(valB, a) % p
    }
}

export default DHAlgorithm