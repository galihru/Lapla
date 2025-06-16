const nerdamer = require('nerdamer');
require('nerdamer/Calculus');    // for diff
require('nerdamer/Laplace');     // for laplace

class LaplaceOperator {
  /**
   * @param {string} exprStr  A function of t, e.g. "exp(-3*t) + t^2"
   */
  constructor(exprStr) {
    this.exprStr = exprStr;
    this.expr   = nerdamer(exprStr);
    console.log(`[INIT] f(t) = ${this.expr.toString()}`);
  }

  /**
   * Compute the nth derivative d^n/dt^n [f(t)]
   * @param {number} order 
   * @param {boolean} showSteps 
   * @returns {nerdamer.Symbol} derivative
   */
  derivative(order = 1, showSteps = true) {
    if (order < 1) throw new Error('Order must be >= 1');
    let curr = this.expr;
    for (let i = 1; i <= order; i++) {
      const der = nerdamer.diff(curr, 't');
      if (showSteps) {
        console.log(`[DERIVATIVE Step ${i}] d/dt of ${curr.toString()} => ${der.toString()}`);
      }
      curr = der;
    }
    return curr;
  }

  /**
   * Compute Laplace transform L{g(t)} = ∫₀^∞ e^{-s t} g(t) dt
   * @param {nerdamer.Symbol|string} target 
   * @param {boolean} showSteps 
   * @returns {nerdamer.Symbol} transform
   */
  laplace(target = null, showSteps = true) {
    const sym = target ? nerdamer(target.toString()) : this.expr;
    const L   = nerdamer.laplace(sym, 't', 's');
    if (showSteps) {
      console.log(`[LAPLACE] Transform of ${sym.toString()} => ${L.toString()}`);
    }
    return L;
  }

  /**
   * Shortcut: differentiate then Laplace-transform
   * @param {number} order 
   * @param {boolean} showSteps 
   */
  laplaceOfDerivative(order = 1, showSteps = true) {
    const der = this.derivative(order, showSteps);
    return this.laplace(der, showSteps);
  }
}

module.exports = { LaplaceOperator };
