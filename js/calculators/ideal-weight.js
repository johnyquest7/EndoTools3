export default class IdealWeight {
  constructor() { this.name = 'Ideal body weight and adjusted body weight'; }

  render(container) {
    container.innerHTML = `
      <div class="form-grid">
        <div><label>Sex</label><select id="sex"><option value="male">Male</option><option value="female">Female</option></select></div>
        <div><label>Height (inches)</label><input id="height" type="number" step="0.1" min="48" /></div>
        <div><label>Actual body weight (kg)</label><input id="abw" type="number" step="0.1" min="1" /></div>
      </div>
      <button id="calc" class="calc-button">Calculate</button>
      <div id="result" class="result"></div>
      <p class="note">IBW (Devine): Male 50 + 2.3×(inches-60), Female 45.5 + 2.3×(inches-60). AdjBW = IBW + 0.4×(ABW-IBW).</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const sex = container.querySelector('#sex').value;
      const h = parseFloat(container.querySelector('#height').value);
      const abw = parseFloat(container.querySelector('#abw').value);
      if (!(h > 0 && abw > 0)) return;
      const base = sex === 'male' ? 50 : 45.5;
      const ibw = base + 2.3 * (h - 60);
      const adj = ibw + 0.4 * (abw - ibw);
      container.querySelector('#result').textContent = `IBW: ${ibw.toFixed(2)} kg | AdjBW: ${adj.toFixed(2)} kg`;
    });
  }
}
