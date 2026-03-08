export default class Fib4 {
  constructor() { this.name = 'FIB-4 score'; }

  render(container) {
    container.innerHTML = `
      <div class="form-grid">
        <div><label>Age (years)</label><input id="age" type="number" step="1" min="1" /></div>
        <div><label>AST (U/L)</label><input id="ast" type="number" step="0.1" min="0.1" /></div>
        <div><label>ALT (U/L)</label><input id="alt" type="number" step="0.1" min="0.1" /></div>
        <div><label>Platelets (10⁹/L)</label><input id="plt" type="number" step="1" min="1" /></div>
      </div>
      <button id="calc" class="calc-button">Calculate</button>
      <div id="result" class="result"></div>
      <p class="note">Formula: FIB-4 = (Age × AST) / (Platelets × √ALT)</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const age = parseFloat(container.querySelector('#age').value);
      const ast = parseFloat(container.querySelector('#ast').value);
      const alt = parseFloat(container.querySelector('#alt').value);
      const plt = parseFloat(container.querySelector('#plt').value);
      if (!(age > 0 && ast > 0 && alt > 0 && plt > 0)) return;
      const score = (age * ast) / (plt * Math.sqrt(alt));
      let interp = 'Indeterminate risk';
      if (score < 1.3) interp = 'Low risk';
      if (score > 2.67) interp = 'High risk';
      container.querySelector('#result').textContent = `FIB-4: ${score.toFixed(2)} (${interp})`;
    });
  }
}
