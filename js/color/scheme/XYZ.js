import {LUV} from './LUV.js'

const epsilon = 0.0088564516
const refY = 1.0
const refU = 0.19783000664283
const refV = 0.46831999493879
const kappa = 903.2962962
const yToL = Y => Y <= epsilon ? Y / refY * kappa : 116 * Math.pow(Y / refY, 1 / 3) - 16

export class XYZ {
    x = 0
    y = 0
    z = 0

    get luv() {
        const luv = new LUV()

        const divider = this.x + 15 * this.y + 3 * this.z
        let varU = 4 * this.x
        let varV = 9 * this.y
        if (divider !== 0) {
            varU /= divider
            varV /= divider
        } else {
            varU = NaN
            varV = NaN
        }
        luv.l = yToL(this.y)
        if (luv.l === 0) {
            luv.u = 0
            luv.v = 0
        } else {
            luv.u = 13 * luv.l * (varU - refU)
            luv.v = 13 * luv.l * (varV - refV)
        }

        return luv
    }
}
