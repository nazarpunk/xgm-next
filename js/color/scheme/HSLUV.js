export class HSLUV {
    h = 0
    s = 0
    l = 0

    toString() {
        return `HSLUV(${this.h.toFixed(2)}, ${this.s.toFixed(2)}, ${this.l.toFixed(2)})`
    }
}
