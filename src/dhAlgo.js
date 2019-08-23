const p = 17
const g = 9
const a = 63
const gPower_a_mod_p = Math.pow(g, a) % p

export default getDHPublic = () => {
    return gPower_a_mod_p
}

export default calculateDHPublicFromOtherSide = (valB) => {
    return Math.pow(valB, a) % p
}