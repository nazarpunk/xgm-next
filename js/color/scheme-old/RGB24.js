import {LUV} from './LUV.js'

export class RGB24 {

    // 6 lines in slope-intercept format: R < 0, R > 1, G < 0, G > 1, B < 0, B > 1
    r0s = 0
    r0i = 0
    r1s = 0
    r1i = 0
    g0s = 0
    g0i = 0
    g1s = 0
    g1i = 0
    b0s = 0
    b0i = 0
    b1s = 0
    b1i = 0

    static m_r0 = 3.240969941904521
    static m_r1 = -1.537383177570093
    static m_r2 = -0.498610760293
    static m_g0 = -0.96924363628087
    static m_g1 = 1.87596750150772
    static m_g2 = 0.041555057407175
    static m_b0 = 0.055630079696993
    static m_b1 = -0.20397695888897
    static m_b2 = 1.056971514242878

    /** @param {number} l */
    calcBoundingLines(l) {
        const sub1 = Math.pow(l + 16, 3) / 1560896
        const sub2 = sub1 > LUV.epsilon ? sub1 : l / LUV.kappa
        const s1r = sub2 * (284517 * RGB24.m_r0 - 94839 * RGB24.m_r2)
        const s2r = sub2 * (838422 * RGB24.m_r2 + 769860 * RGB24.m_r1 + 731718 * RGB24.m_r0)
        const s3r = sub2 * (632260 * RGB24.m_r2 - 126452 * RGB24.m_r1)
        const s1g = sub2 * (284517 * RGB24.m_g0 - 94839 * RGB24.m_g2)
        const s2g = sub2 * (838422 * RGB24.m_g2 + 769860 * RGB24.m_g1 + 731718 * RGB24.m_g0)
        const s3g = sub2 * (632260 * RGB24.m_g2 - 126452 * RGB24.m_g1)
        const s1b = sub2 * (284517 * RGB24.m_b0 - 94839 * RGB24.m_b2)
        const s2b = sub2 * (838422 * RGB24.m_b2 + 769860 * RGB24.m_b1 + 731718 * RGB24.m_b0)
        const s3b = sub2 * (632260 * RGB24.m_b2 - 126452 * RGB24.m_b1)
        this.r0s = s1r / s3r
        this.r0i = s2r * l / s3r
        this.r1s = s1r / (s3r + 126452)
        this.r1i = (s2r - 769860) * l / (s3r + 126452)
        this.g0s = s1g / s3g
        this.g0i = s2g * l / s3g
        this.g1s = s1g / (s3g + 126452)
        this.g1i = (s2g - 769860) * l / (s3g + 126452)
        this.b0s = s1b / s3b
        this.b0i = s2b * l / s3b
        this.b1s = s1b / (s3b + 126452)
        this.b1i = (s2b - 769860) * l / (s3b + 126452)
    }
}
