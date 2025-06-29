# Lapla

**Symbolic Differentiation & Laplace Transform Utility for JavaScript**  
A scientific library delivering transparent, step-by-step symbolic computations for time-domain functions and their Laplace transforms.

---

## Overview

`Lapla` provides:

1. **Expression parsing** of any \(f(t)\) via string input.  
2. **Symbolic differentiation** up to integer order \(n\), with each intermediate step logged.  
3. **Laplace transform** $$\(\mathcal{L}\{\,\cdot\,\}(s)\)$$ of the base function or its derivatives.  
4. A **CLI tool** `laplaceop` and a programmatic **`LaplaceOperator`** class.

---

## Installation

```bash
npm install -g @galihru/lapla
````

Or to include locally in a project:

```bash
npm install @galihru/lapla
```

---

## Programmatic API

```js
const { LaplaceOperator } = require('galihridhoutomo/Lapla');

// 1. Instantiate with a time-domain function f(t)
const op = new LaplaceOperator("exp(-3*t) + t^2");

// 2. First derivative:
//    d/dt [ e^{-3t} + t^2 ] = -3 e^{-3t} + 2 t
op.derivative(1);

// 3. Second derivative:
op.derivative(2);

// 4. Laplace transform of f(t):
//    L{e^{-3t} + t^2}(s) = 1/(s+3) + 2/s^3
op.laplace();

// 5. Laplace transform of the first derivative:
op.laplaceOfDerivative(1);
```

---

## CLI Usage

Once installed globally:

```bash
laplaceop "t^3*exp(-4*t)" -d 1 -l
```

Flags:

* `-d, --deriv N` : compute the $N$th derivative of $f(t)$
* `-l, --laplace` : compute the Laplace transform

Output is printed in clear, stepwise form.

---

## Mathematical Basis

* **Differentiation**:

  $$\frac{d^n}{dt^n}f(t) \quad\text{via symbolic engine.}$$

* **Laplace Transform**:

  $$\mathcal{L}\{f(t)\}(s) \;=\; \int_{0^-}^{\infty} e^{-s t}\,f(t)\,\mathrm{d}t$$

---

## Testing

```bash
npm test
```

---

## License

MIT © 2025
