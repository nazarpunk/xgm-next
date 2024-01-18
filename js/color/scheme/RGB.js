import {XYZ} from './XYZ.js'

const toLinear = c => c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92

export class RGB {
    r = 0 // [0,1]
    g = 0 // [0,1]
    b = 0 // [0,1]

    toString(){
        return `RGB(${this.r.toFixed(2)}, ${this.g.toFixed(2)}, ${this.b.toFixed(2)})`
    }

    get xyz() {
        const xyz = new XYZ()

        const lr = toLinear(this.r)
        const lg = toLinear(this.g)
        const lb = toLinear(this.b)

        xyz.x = 0.41239079926595 * lr + 0.35758433938387 * lg + 0.18048078840183 * lb
        xyz.y = 0.21263900587151 * lr + 0.71516867876775 * lg + 0.072192315360733 * lb
        xyz.z = 0.019330818715591 * lr + 0.11919477979462 * lg + 0.95053215224966 * lb

        return xyz
    }
}
