export class hsluv {
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
    s = 0
    l = 0

    /**
     * @param {?number} h
     * @param {?number} s
     * @param {?number} l
     * @return {Color}
     */
    set(h, s, l) {
        if (h != null) {
            this.h = h
        }
        if (s != null) {
            this.s = s
        }
        if (l != null) {
            this.l = l
        }
        return this.toHex()
    }

    /**
     * @param {?number} h
     * @param {?number} s
     * @param {?number} l
     * @return {Color}
     */
    add(h, s, l) {
        if (h != null) {
            this.h += h
        }
        if (s != null) {
            this.s += s
        }
        if (l != null) {
            this.l += l
        }
        return this.toHex()
    }

    /**
     * @param {number} slope
     * @param {number} intercept
     * @param {number} angle
     * @return {number}
     */
    static distanceFromOriginAngle(slope, intercept, angle) {
        const d = intercept / (Math.sin(angle) - slope * Math.cos(angle))
        return d < 0 ? Infinity : d
    }

    /**
     * @param {number} h
     * @return {number}
     */
    maxChroma(h) {
        const rgb24 = this._color.rgb24
        const hueRad = h / 360 * Math.PI * 2
        const r0 = hsluv.distanceFromOriginAngle(rgb24.r0s, rgb24.r0i, hueRad)
        const r1 = hsluv.distanceFromOriginAngle(rgb24.r1s, rgb24.r1i, hueRad)
        const g0 = hsluv.distanceFromOriginAngle(rgb24.g0s, rgb24.g0i, hueRad)
        const g1 = hsluv.distanceFromOriginAngle(rgb24.g1s, rgb24.g1i, hueRad)
        const b0 = hsluv.distanceFromOriginAngle(rgb24.b0s, rgb24.b0i, hueRad)
        const b1 = hsluv.distanceFromOriginAngle(rgb24.b1s, rgb24.b1i, hueRad)
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
            lch.c = this.maxChroma(this.h) / 100 * this.s
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
