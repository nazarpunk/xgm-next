export class Color {
    h = 0
    s = 0
    l = 0

    r = 0 // [0, 255]
    g = 0 // [0, 255]
    b = 0 // [0, 255]
    a = 0 // [0, 255]

    /**
     * https://www.30secondsofcode.org/js/s/hex-to-rgb/
     * @param {string} hex
     * @returns {Color}
     */
    static fromHex(hex) {
        let alpha = false
        let h = hex.slice(hex.startsWith('#') ? 1 : 0)
        if (h.length === 3) h = [...h].map(x => x + x).join('')
        else if (h.length === 8) alpha = true
        h = parseInt(h, 16)

        const c = new Color()
        c.r = h >>> (alpha ? 24 : 16)
        c.g = (h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)
        c.b = (h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)
        c.a = alpha ? h & 0x000000ff : 255

        return c.rgb2hsl()
    }

    // noinspection JSUnusedGlobalSymbols
    get rgb2css() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }

    /**
     * https://gist.github.com/mjackson/5311256
     * @returns {Color}
     */
    rgb2hsl() {
        const r = this.r / 255
        const g = this.g / 255
        const b = this.b / 255

        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        this.l = (max + min) / 2

        if (max === min) {
            this.h = this.s = 0 // achromatic
            return this
        }

        const d = max - min
        this.s = this.l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                this.h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                this.h = (b - r) / d + 2
                break
            case b:
                this.h = (r - g) / d + 4
                break
        }
        this.h /= 6

        return this
    }

    /**
     * https://gist.github.com/mjackson/5311256
     * @returns {Color}
     */
    hsl2rgb(h, s, l) {
        if (s === 0) {
            this.r = this.g = this.b = l // achromatic
            return this
        }

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        this.r = hue2rgb(p, q, h + 1 / 3)
        this.g = hue2rgb(p, q, h)
        this.b = hue2rgb(p, q, h - 1 / 3)

        return this

        //return [ r * 255, g * 255, b * 255 ]
    }

    // noinspection JSUnusedGlobalSymbols
    get hsl2css() {
        return `hsl(${Math.floor(this.h * 360)}, ${Math.round(this.s * 100)}%, ${Math.round(this.l * 100)}%)`
    }

}

