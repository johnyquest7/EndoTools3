export default class BMI {
  constructor() { this.name = 'BMI calculator'; }
  render(container) {
    container.innerHTML = `<div class="form-grid">
      <div><label>Units</label><select id="units"><option value="us">US (ft/in, lb)</option><option value="metric">Metric (m, kg)</option></select></div>
      <div><label id="h1l">Feet</label><input id="h1" type="number" step="0.01"></div>
      <div><label id="h2l">Inches</label><input id="h2" type="number" step="0.01"></div>
      <div><label id="wl">Pounds</label><input id="w" type="number" step="0.01"></div>
    </div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    const units = container.querySelector('#units');
    const h2 = container.querySelector('#h2');
    const h2l = container.querySelector('#h2l');
    const h1l = container.querySelector('#h1l');
    const wl = container.querySelector('#wl');
    units.addEventListener('change', () => {
      if (units.value === 'metric') {
        h1l.textContent = 'Meters'; wl.textContent = 'Kilograms'; h2.style.display = 'none'; h2l.style.display = 'none';
      } else {
        h1l.textContent = 'Feet'; wl.textContent = 'Pounds'; h2.style.display = ''; h2l.style.display = '';
      }
    });
    container.querySelector('#calc').addEventListener('click', () => {
      const w = parseFloat(container.querySelector('#w').value);
      const h1 = parseFloat(container.querySelector('#h1').value);
      const h2v = parseFloat(container.querySelector('#h2').value || '0');
      if (!(w > 0 && h1 > 0)) return;
      let bmi = 0;
      if (units.value === 'metric') bmi = w / (h1 * h1);
      else {
        const m = (h1 * 0.3048) + (h2v * 0.0254);
        bmi = (w / 2.2) / (m * m);
      }
      container.querySelector('#result').textContent = `BMI: ${bmi.toFixed(2)}`;
    });
  }
}
