import {LCH} from './LCH.js'

export class LUV {
    l = 0
    u = 0
    v = 0

    static refY = 1.0
    static refU = 0.19783000664283
    static refV = 0.46831999493879
    static kappa = 903.2962962
    static epsilon = 0.0088564516

    get lch() {
        const lch = new LCH()

        lch.l = this.l
        lch.c = Math.sqrt(this.u * this.u + this.v * this.v)
        if (lch.c < 0.00000001) {
            lch.h = 0
        } else {
            const hrad = Math.atan2(this.v, this.u)
            lch.h = hrad * 180.0 / Math.PI
            if (lch.h < 0) {
                lch.h = 360 + lch.h
            }
        }

        return lch
    }

    /**
     * @param {number} L
     * @return {number}
     */
    static lToY(L) {
        return L <= 8 ? LUV.refY * L / LUV.kappa : LUV.refY * Math.pow((L + 16) / 116, 3)
    }

    /**
     * @param {number} Y
     * @return {number}
     */
    static y2l(Y) {
        return Y <= LUV.epsilon ? Y / LUV.refY * LUV.kappa : 116 * Math.pow(Y / LUV.refY, 1 / 3) - 16
    }

    /**
     * @return {Color}
     */
    toXyz() {
        const xyz = this._color.xyz

        if (this.l === 0) {
            xyz.x = 0
            xyz.y = 0
            xyz.z = 0
        } else {
            const varU = this.u / (13 * this.l) + LUV.refU
            const varV = this.v / (13 * this.l) + LUV.refV
            xyz.y = LUV.lToY(this.l)
            xyz.x = 0 - 9 * xyz.y * varU / ((varU - 4) * varV - varU * varV)
            xyz.z = (9 * xyz.y - 15 * varV * xyz.y - varV * xyz.x) / (3 * varV)
        }
        return this._color
    }
}
