import {HEX} from './HEX.js'
import {RGB} from './RGB.js'
import {HSL} from './HSL.js'
import {XYZ} from './XYZ.js'
import {LUV} from './LUV.js'
import {LCH} from './LCH.js'
import {HSLUV} from './HSLUV.js'

export class Color {
    hex = new HEX()
    rgb = new RGB()
    hsl = new HSL()
    xyz = new XYZ()
    luv = new LUV()
    lch = new LCH()
    hsluv = new HSLUV()

    get clone() {
        const c = new Color()
        c.hex = this.hex.clone
        c.rgb = this.rgb.clone
        c.hsl = this.hsl.clone
        return c
    }

    /**
     * @param {string} color
     * @returns {Color}
     */
    static fromHex(color) {
        const c = new Color()
        c.hex = new HEX()
        c.hex.hex = color
        return c
    }

    get hex2rgb() {
        this.rgb = this.hex.rgb
        return this
    }

    get hex2hsl() {
        this.hex2rgb.hsl = this.rgb.hsl
        return this
    }

    get hex2hsluv() {
        this.rgb = this.hex.rgb
        this.xyz = this.rgb.xyz
        this.luv = this.xyz.luv
        this.lch = this.luv.lch
        this.hsluv = this.lch.hsluv
        return this
    }

    get rgb2hex() {
        this.hex = this.rgb.hex
        return this
    }

    get rgb2hsl() {
        this.hsl = this.rgb.hsl
        return this
    }

    get hsl2hex() {
        this.rgb = this.hsl.rgb
        this.hex = this.rgb.hex
        return this
    }

}

