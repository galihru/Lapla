import * as Lapla from 'https://unpkg.com/@galihridhoutomo/lapla@1.1.0?module';

const exprInput = document.getElementById('expression');
const calcBtn = document.getElementById('calc');
const outputDiv = document.getElementById('output');

function typeWriter(text, element, speed = 40) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else {
      MathJax.typesetPromise([element]);
    }
  }
  type();
}

calcBtn.addEventListener('click', () => {
  const f = exprInput.value.trim();
  if (!f) return;
  typeWriter(`Computing L{ ${f} }...`, outputDiv);
  setTimeout(() => {
    try {
      const result = Lapla.laplace(f);
      const latex = Lapla.toLatex(result);
      const display = `$$ L\{ ${f} \}(s) = ${latex} $$`;
      typeWriter(display, outputDiv, 20);
    } catch {
      typeWriter('Error: invalid expression', outputDiv, 20);
    }
  }, f.length * 30 + 500);
});
