export default class OsmolalityGap {
  constructor() { this.name = 'Serum osmolality and gap calculator'; }

  render(container) {
    container.innerHTML = `
      <div class="form-grid">
        <div><label>Sodium (mEq/L)</label><input id="na" type="number" step="0.1" /></div>
        <div><label>Glucose (mg/dL)</label><input id="glu" type="number" step="0.1" /></div>
        <div><label>BUN (mg/dL)</label><input id="bun" type="number" step="0.1" /></div>
        <div><label>Ethanol (mg/dL, optional)</label><input id="eth" type="number" step="0.1" value="0" /></div>
        <div><label>Measured osmolality (mOsm/kg)</label><input id="meas" type="number" step="0.1" /></div>
      </div>
      <button id="calc" class="calc-button">Calculate</button>
      <div id="result" class="result"></div>
      <p class="note">Calculated osmolality = 2×Na + Glucose/18 + BUN/2.8 + Ethanol/3.7. Osmolal gap = Measured − Calculated.</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const na = parseFloat(container.querySelector('#na').value);
      const glu = parseFloat(container.querySelector('#glu').value);
      const bun = parseFloat(container.querySelector('#bun').value);
      const eth = parseFloat(container.querySelector('#eth').value || '0');
      const meas = parseFloat(container.querySelector('#meas').value);
      if (!(na > 0 && glu >= 0 && bun >= 0 && meas > 0)) return;
      const calc = 2 * na + glu / 18 + bun / 2.8 + eth / 3.7;
      const gap = meas - calc;
      container.querySelector('#result').textContent = `Calculated osmolality: ${calc.toFixed(2)} | Osmolal gap: ${gap.toFixed(2)}`;
    });
  }
}
