import {HSLUV} from './HSLUV.js'
import {RGB24} from './RGB24.js'

export class LCH {
    l = 0
    c = 0
    h = 0

    get hsluv() {
        const hsluv = new HSLUV()

        if (this.l > 99.9999999) {
            hsluv.s = 0
            hsluv.l = 100
        } else if (this.l < 0.00000001) {
            hsluv.s = 0
            hsluv.l = 0
        } else {
            new RGB24().calcBoundingLines(this.l)
            hsluv.s = this.c / hsluv.maxChroma(this.h) * 100
            hsluv.l = this.l
        }
        hsluv.h = this.h

        return hsluv
    }

    /**
     * @return {Color}
     */
    toHpluv() {
        const hpluv = this._color.hpluv

        if (this.l > 99.9999999) {
            hpluv.p = 0
            hpluv.l = 100
        } else if (this.l < 0.00000001) {
            hpluv.p = 0
            hpluv.l = 0
        } else {
            this._color.rgb24.calcBoundingLines(this.l)
            hpluv.p = this.c / hpluv.maxChroma() * 100
            hpluv.l = this.l
        }
        hpluv.h = this.h

        return this._color
    }

    /**
     * @return {Color}
     */
    toLuv() {
        const luv = this._color.luv
        const hrad = this.h / 180.0 * Math.PI
        luv.l = this.l
        luv.u = Math.cos(hrad) * this.c
        luv.v = Math.sin(hrad) * this.c
        return this._color
    }
}