export class hpluv {
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

    h = 0
    p = 0
    l = 0

    /**
     * @param {number} slope
     * @param {number} intercept
     * @return {number}
     */
    static distanceFromOrigin(slope, intercept) {
        return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1)
    }

    maxChroma() {
        const rgb24 = this._color.rgb24
        const r0 = hpluv.distanceFromOrigin(rgb24.r0s, rgb24.r0i)
        const r1 = hpluv.distanceFromOrigin(rgb24.r1s, rgb24.r1i)
        const g0 = hpluv.distanceFromOrigin(rgb24.g0s, rgb24.g0i)
        const g1 = hpluv.distanceFromOrigin(rgb24.g1s, rgb24.g1i)
        const b0 = hpluv.distanceFromOrigin(rgb24.b0s, rgb24.b0i)
        const b1 = hpluv.distanceFromOrigin(rgb24.b1s, rgb24.b1i)
        return Math.min(r0, r1, g0, g1, b0, b1)
    }

    /**
     * @return {Color}
     */
    toLch() {
        const lch = this._color.lch

        if (this.l > 99.9999999) {
            lch.l = 100
            lch.c = 0
        } else if (this.l < 0.00000001) {
            lch.l = 0
            lch.c = 0
        } else {
            lch.l = this.l
            this._color.rgb24.calcBoundingLines(this.l)
            lch.c = this.maxChroma() / 100 * this.p
        }
        lch.h = this.h

        return this._color
    }

    /**
     * @return {Color}
     */
    toHex() {
        return this
            .toLch()
            .lch.toLuv()
            .luv.toXyz()
            .xyz.toRgb()
            .xyz.toLab()
            .rgb.toHsl()
            .rgb.toHex()
    }
}
