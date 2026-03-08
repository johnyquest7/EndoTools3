export default class EgfrMdrd {
  constructor() { this.name = 'eGFR MDRD'; }
  render(container) {
    container.innerHTML = `<div class="form-grid">
      <div><label>Age (years)</label><input id="age" type="number" min="1"></div>
      <div><label>Serum creatinine (mg/dL)</label><input id="cr" type="number" step="0.01" min="0.01"></div>
      <div><label>African American</label><select id="aa"><option value="1.212">Yes</option><option value="1">No</option></select></div>
      <div><label>Sex</label><select id="sex"><option value="0.742">Female</option><option value="1">Male</option></select></div>
    </div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click', () => {
      const age = parseFloat(container.querySelector('#age').value);
      const cr = parseFloat(container.querySelector('#cr').value);
      const aa = parseFloat(container.querySelector('#aa').value);
      const sex = parseFloat(container.querySelector('#sex').value);
      if (!(age > 0 && cr > 0)) return;
      const egfr = 175 * Math.pow(cr, -1.154) * Math.pow(age, -0.203) * aa * sex;
      container.querySelector('#result').textContent = `eGFR: ${egfr.toFixed(2)} mL/min/1.73m²`;
    });
  }
}
