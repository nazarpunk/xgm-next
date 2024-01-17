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
        const color = Color.fromHex(hex).hex2rgb().rgb2hsl()

        switch (name) {
            case 'background':
                this.colors.background = color.hsl2hex
        }

        for (const [k, v] of Object.entries(this.colors)) {
            window.themeColor[k][this.index] = v
        }

        window.PrefersColorScheme.save()
    }
}

