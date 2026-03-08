export default class NafldFibrosis {
  constructor() { this.name = 'NAFLD fibrosis score'; }

  render(container) {
    container.innerHTML = `
      <div class="form-grid">
        <div><label>Age (years)</label><input id="age" type="number" step="1" min="1" /></div>
        <div><label>BMI (kg/m²)</label><input id="bmi" type="number" step="0.1" min="1" /></div>
        <div><label>Diabetes / IFG</label><select id="dm"><option value="0">No</option><option value="1">Yes</option></select></div>
        <div><label>AST (U/L)</label><input id="ast" type="number" step="0.1" min="0.1" /></div>
        <div><label>ALT (U/L)</label><input id="alt" type="number" step="0.1" min="0.1" /></div>
        <div><label>Platelets (10⁹/L)</label><input id="plt" type="number" step="1" min="1" /></div>
        <div><label>Albumin (g/dL)</label><input id="alb" type="number" step="0.1" min="0.1" /></div>
      </div>
      <button id="calc" class="calc-button">Calculate</button>
      <div id="result" class="result"></div>
      <p class="note">Formula: -1.675 + 0.037×Age + 0.094×BMI + 1.13×DM + 0.99×AST/ALT - 0.013×Platelets - 0.66×Albumin</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const age = parseFloat(container.querySelector('#age').value);
      const bmi = parseFloat(container.querySelector('#bmi').value);
      const dm = parseFloat(container.querySelector('#dm').value);
      const ast = parseFloat(container.querySelector('#ast').value);
      const alt = parseFloat(container.querySelector('#alt').value);
      const plt = parseFloat(container.querySelector('#plt').value);
      const alb = parseFloat(container.querySelector('#alb').value);
      if (!(age > 0 && bmi > 0 && ast > 0 && alt > 0 && plt > 0 && alb > 0)) return;
      const score = -1.675 + 0.037 * age + 0.094 * bmi + 1.13 * dm + 0.99 * (ast / alt) - 0.013 * plt - 0.66 * alb;
      let interp = 'Indeterminate';
      if (score < -1.455) interp = 'Low likelihood advanced fibrosis';
      if (score > 0.676) interp = 'High likelihood advanced fibrosis';
      container.querySelector('#result').textContent = `NAFLD fibrosis score: ${score.toFixed(3)} (${interp})`;
    });
  }
}
