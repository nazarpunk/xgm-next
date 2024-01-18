import {Color} from './color.js'

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
        const a = Color.fromHex(hex).hex2hsl

        console.log(`${a.rgb.hsl} ${a.rgb.hsl.css} | ${a.rgb.toHsl} ${a.rgb.toHsl.css}`)

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

