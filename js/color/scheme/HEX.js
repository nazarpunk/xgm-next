import {RGB} from './RGB.js'

export class HEX {

    hex = '#000000'

    get clone() {
        const hex = new HEX()
        hex.hex = this.hex
        return hex
    }

    /**
     * https://www.30secondsofcode.org/js/s/hex-to-rgb/
     * @returns {RGB}
     */
    get rgb() {
        let alpha = false
        let h = this.hex.slice(this.hex.startsWith('#') ? 1 : 0)
        if (h.length === 3) h = [...h].map(x => x + x).join('')
        else if (h.length === 8) alpha = true
        h = parseInt(h, 16)

        const out = new RGB()

        out.r = h >>> (alpha ? 24 : 16)
        out.g = (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)
        out.b = (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)
        out.a = alpha ? h & 0x000000ff : 255

        return out
    }

    toString() {
        return this.hex
    }

    // === legacy

    /**
     * @param {hex} color
     * @param {number} t
     * @return {Color}
     */
    blend(color, t) {
        const [rA, gA, bA] = this.hex.match(/\w\w/g).map(c => parseInt(c, 16))
        const [rB, gB, bB] = color.match(/\w\w/g).map(c => parseInt(c, 16))
        const r = Math.round(rA + (rB - rA) * t).toString(16).padStart(2, '0')
        const g = Math.round(gA + (gB - gA) * t).toString(16).padStart(2, '0')
        const b = Math.round(bA + (bB - bA) * t).toString(16).padStart(2, '0')
        return this.set('#' + r + g + b)
    }
}
