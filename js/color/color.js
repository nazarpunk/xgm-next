import {HEX} from './scheme/HEX.js'
import {RGB} from './scheme/RGB.js'
import {HSL} from './scheme/HSL.js'

export class Color {
    hex = new HEX()
    rgb = new RGB()
    hsl = new HSL()

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

