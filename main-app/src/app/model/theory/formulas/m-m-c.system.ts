export const p0 = "\\[ P_0 = \\left[ \\sum_{n=0}^{c - 1}\\frac{\\rho^n}{n!} + \\frac{\\rho^c}{c!(1-a)} \\right]^{-1} \\]";

export const pn =
    "\\[ P_n = \\left\\{ " +
    "\\begin{array}{ll} " +
    "\\frac{\\rho^n}{n!}P_0, & \\mbox{if } n\\leq c \\\\ " +
    "\\frac{\\rho^n}{c!c^{n-c}}P_0, & \\mbox{if }  n \\geq c. " +
    "\\end{array} " +
    "\\right. \\]";

export const pnGeqN =
    "\\[ P[N\\geq n ] = \\left\\{ " +
    "\\begin{array}{ll} " +
    "P_0 \\left[ \\sum_{k=n}^{c - 1}\\frac{\\rho^k}{k!} + \\frac{\\rho^c}{c!(1-a)} \\right], & \\mbox{if } n<c, \\\\ " +
    "P_0 \\left[ \\frac{a^c a^{n-c}}{c!(1-a)} \\right] = P[N\\geq c ] a^{n-c}, & \\mbox{if } n\\geq c " +
    "\\end{array} " +
    "\\right. \\]";

export const qLen = "\\[ \\bar{Q} = \\bar{\\lambda} * \\bar{W} = \\frac{\\rho P[N \\geq c]}{c(1-a)} \\]";

export const pnGeqC = "\\[ P[N\\geq c] = \\frac{\\frac{\\rho^c}{c!}}{(1 - \\frac{\\rho}{c}) \\sum_{n=0}^{c - 1}\\frac{\\rho^n}{n!} + \\frac{\\rho^c}{c!} } \\]";

export const wTime = "\\[ \\bar{W} = \\frac{P[N\\geq c] \\bar{S}}{c(1-a)} \\]";
