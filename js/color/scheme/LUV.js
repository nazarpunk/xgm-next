import {LCH} from './LCH.js'

export class LUV {
    l = 0
    u = 0
    v = 0

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

}
