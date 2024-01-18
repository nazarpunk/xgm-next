import {RGB} from './RGB.js'

export class HSL {
    h = 0 // [0, 1]
    s = 0 // [0, 1]
    l = 0 // [0, 1]

    get clone() {
        const hsl = new HSL()
        hsl.h = this.h
        hsl.s = this.s
        hsl.l = this.l
        return hsl
    }

    toString() {
        return `${this.h.toFixed(2)},${this.s.toFixed(2)},${this.l.toFixed(2)}`
    }

    // https://gist.github.com/mjackson/5311256
    get rgb() {
        const trunc = p => Math.min(Math.round(p * 255), 255)
        const rgb = new RGB()

        if (this.s === 0) {
            rgb.r = rgb.g = rgb.b = trunc(this.l) // achromatic
            return rgb
        }

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s
        const p = 2 * this.l - q

        rgb.r = trunc(hue2rgb(p, q, this.h + 1 / 3))
        rgb.g = trunc(hue2rgb(p, q, this.h))
        rgb.b = trunc(hue2rgb(p, q, this.h - 1 / 3))

        return rgb
    }

    // noinspection JSUnusedGlobalSymbols
    get css() {
        return `hsl(${Math.floor(this.h * 360)}, ${Math.round(this.s * 100)}%, ${Math.round(this.l * 100)}%)`
    }
}

