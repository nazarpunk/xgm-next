import {Hsluv} from './hsluv-lib.js'
import {HEX} from './scheme/HEX.js'

export class ColorScheme {

    /**
     * @param {number} index
     */
    constructor(index) {
        this.index = index

        for (const [k, v] of Object.entries(window.themeColor)) {
            this.colors[k] = v[index]
        }
    }

    colors = {}

    /**
     * @param {string} name
     * @param {string} hex
     */
    setColor(name, hex) {
        const hsluv = new Hsluv()
        hsluv.hex = hex
        hsluv.hexToHsluv()
        hsluv.hsluvToHex()

        const hx = new HEX()
        hx.hex = hex

// return this.rgb.xyz.luv.lch.hsluv

        console.log(`${hex} ${hsluv.hex} || ${hx.hsluv}  | ${hsluv.hsluv_h.toFixed(2)},${hsluv.hsluv_s.toFixed(2)},${hsluv.hsluv_l.toFixed(2)} | `)

        if (1) return

        switch (name) {
            case 'background':
                this.colors.background = a.hsl2hex.hex.toString()
                const c = a.clone

                this.colors.color = c.hsl2hex.hex.toString()

        }

        for (const [k, v] of Object.entries(this.colors)) {
            window.themeColor[k][this.index] = v
        }

        window.PrefersColorScheme.save()
    }
}

