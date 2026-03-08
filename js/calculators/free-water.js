export default class FreeWaterDeficit {
  constructor() { this.name = 'Free water deficit in hypernatremia'; }

  render(container) {
    container.innerHTML = `
      <div class="form-grid">
        <div><label>Sex</label><select id="sex"><option value="male">Male</option><option value="female">Female</option></select></div>
        <div><label>Weight (kg)</label><input id="wt" type="number" step="0.1" /></div>
        <div><label>Current sodium (mEq/L)</label><input id="na" type="number" step="0.1" /></div>
        <div><label>Target sodium (mEq/L)</label><input id="target" type="number" step="0.1" value="140" /></div>
      </div>
      <button id="calc" class="calc-button">Calculate</button>
      <div id="result" class="result"></div>
      <p class="note">TBW factor: 0.6 (male), 0.5 (female). Deficit (L) = TBW × ((Na/Target) − 1).</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const sex = container.querySelector('#sex').value;
      const wt = parseFloat(container.querySelector('#wt').value);
      const na = parseFloat(container.querySelector('#na').value);
      const target = parseFloat(container.querySelector('#target').value);
      if (!(wt > 0 && na > 0 && target > 0)) return;
      const tbw = (sex === 'male' ? 0.6 : 0.5) * wt;
      const deficit = tbw * ((na / target) - 1);
      container.querySelector('#result').textContent = `Estimated free water deficit: ${Math.max(deficit, 0).toFixed(2)} L`;
    });
  }
}
