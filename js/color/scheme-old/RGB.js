import {HEX} from './HEX.js'
import {HSL} from './HSL.js'
import {XYZ} from './XYZ.js'

export class RGB {
    r = 0 // [0, 255]
    g = 0 // [0, 255]
    b = 0 // [0, 255]
    a = 0 // [0, 255]

    get clone() {
        const rgb = new RGB()
        rgb.r = this.r
        rgb.g = this.g
        rgb.b = this.b
        rgb.a = this.a
        return rgb
    }

    toString() {
        return `${this.r},${this.g},${this.b}`
    }

    get hex() {
        const hex = new HEX()
        /**
         * @param {number} v
         * @returns {string}
         */
        const v = v => v.toString(16).padStart(2, '0')
        hex.hex = `#${v(this.r)}${v(this.g)}${v(this.b)}`
        return hex
    }

    // https://gist.github.com/mjackson/5311256
    get hsl() {
        const r = this.r / 255
        const g = this.g / 255
        const b = this.b / 255

        const hsl = new HSL()

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        hsl.l = (max + min) / 2

        if (max === min) {
            hsl.h = hsl.s = 0 // achromatic
            return hsl
        }

        const d = max - min
        hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                hsl.h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                hsl.h = (b - r) / d + 2
                break
            case b:
                hsl.h = (r - g) / d + 4
                break
        }
        hsl.h /= 6

        return hsl
    }

    get xyz() {
        /**
         * @param {number} c
         * @return {number}
         */
        const toLinear = c => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92

        const lr = toLinear(this.r) / 255
        const lg = toLinear(this.g) / 255
        const lb = toLinear(this.b) / 255

        const xyz = new XYZ()

        xyz.x = 0.41239079926595 * lr + 0.35758433938387 * lg + 0.18048078840183 * lb
        xyz.y = 0.21263900587151 * lr + 0.71516867876775 * lg + 0.072192315360733 * lb
        xyz.z = 0.019330818715591 * lr + 0.11919477979462 * lg + 0.95053215224966 * lb

        return xyz
    }


    // noinspection JSUnusedGlobalSymbols
    get css() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    // === legacy

    /**
     * @return {number}
     */
    luminance() {
        const a = [this.r, this.g, this.b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    }
}
