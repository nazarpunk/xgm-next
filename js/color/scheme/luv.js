export class luv {
    /**
     * @param {Color} color
     */
    constructor(color) {
        this._color = color
    }

    /**
     * @private
     * @type {Color}
     */
    _color

    l = 0
    u = 0
    v = 0

    static refY = 1.0
    static refU = 0.19783000664283
    static refV = 0.46831999493879
    static kappa = 903.2962962
    static epsilon = 0.0088564516

    /**
     * @return {Color}
     */
    toLch() {
        const lch = this._color.lch

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

        return this._color
    }

    /**
     * @param {number} L
     * @return {number}
     */
    static lToY(L) {
        return L <= 8 ? luv.refY * L / luv.kappa : luv.refY * Math.pow((L + 16) / 116, 3)
    }

    /**
     * @param {number} Y
     * @return {number}
     */
    static yToL(Y) {
        return Y <= luv.epsilon ? Y / luv.refY * luv.kappa : 116 * Math.pow(Y / luv.refY, 1 / 3) - 16
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
            const varU = this.u / (13 * this.l) + luv.refU
            const varV = this.v / (13 * this.l) + luv.refV
            xyz.y = luv.lToY(this.l)
            xyz.x = 0 - 9 * xyz.y * varU / ((varU - 4) * varV - varU * varV)
            xyz.z = (9 * xyz.y - 15 * varV * xyz.y - varV * xyz.x) / (3 * varV)
        }
        return this._color
    }
}
