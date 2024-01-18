export class xyz {
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

    x = 0
    y = 0
    z = 0

    /**
     * @return {Color}
     */
    toLuv() {
        const luv = this._color.luv

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
        luv.l = luv.yToL(this.y)
        if (luv.l === 0) {
            luv.u = 0
            luv.v = 0
        } else {
            luv.u = 13 * luv.l * (varU - luv.refU)
            luv.v = 13 * luv.l * (varV - luv.refV)
        }

        return this._color
    }

    /**
     * @param {number} c
     * @return {number}
     */
    static fromLinear(c) {
        return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
    }

    /**
     * @return {Color}
     */
    toRgb() {
        const rgb = this._color.rgb
        rgb.r = xyz.fromLinear(rgb24.m_r0 * this.x + rgb24.m_r1 * this.y + rgb24.m_r2 * this.z)
        rgb.g = xyz.fromLinear(rgb24.m_g0 * this.x + rgb24.m_g1 * this.y + rgb24.m_g2 * this.z)
        rgb.b = xyz.fromLinear(rgb24.m_b0 * this.x + rgb24.m_b1 * this.y + rgb24.m_b2 * this.z)
        return this._color
    }

    /**
     * @return {Color}
     */
    toLab() {
        let {x, y, z} = this

        x /= 0.94811
        z /= 1.07304

        x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116

        const lab = this._color.lab

        lab.l = 116 * y - 16
        lab.a = 500 * (x - y)
        lab.b = 200 * (y - z)

        return this._color
    }

}
