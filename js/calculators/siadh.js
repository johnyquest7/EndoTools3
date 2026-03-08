export default class SiadhCriteria {
  constructor() { this.name = 'SIADH diagnostic criteria'; }

  render(container) {
    container.innerHTML = `
      <p class="note">Bartter-Schwartz style checklist for SIADH support.</p>
      <div class="form-grid">
        <div><label>Serum osmolality (mOsm/kg)</label><input id="serumOsm" type="number" step="0.1" /></div>
        <div><label>Urine osmolality (mOsm/kg)</label><input id="urineOsm" type="number" step="0.1" /></div>
        <div><label>Urine sodium (mEq/L)</label><input id="urineNa" type="number" step="0.1" /></div>
        <div><label>Clinical euvolemia</label><select id="euvolemia"><option value="yes">Yes</option><option value="no">No</option></select></div>
        <div><label>Normal adrenal/thyroid function</label><select id="endo"><option value="yes">Yes</option><option value="no">No</option></select></div>
        <div><label>No recent diuretic use</label><select id="diuretic"><option value="yes">Yes</option><option value="no">No</option></select></div>
      </div>
      <button id="calc" class="calc-button">Evaluate</button>
      <div id="result" class="result"></div>
      <p class="note">Supportive pattern: low serum osmolality, inappropriately concentrated urine, elevated urine sodium, euvolemia, and exclusion of adrenal/thyroid failure and diuretic effect.</p>
    `;

    container.querySelector('#calc').addEventListener('click', () => {
      const serumOsm = parseFloat(container.querySelector('#serumOsm').value);
      const urineOsm = parseFloat(container.querySelector('#urineOsm').value);
      const urineNa = parseFloat(container.querySelector('#urineNa').value);
      const euvolemia = container.querySelector('#euvolemia').value === 'yes';
      const endo = container.querySelector('#endo').value === 'yes';
      const noDiuretic = container.querySelector('#diuretic').value === 'yes';

      if (!(serumOsm > 0 && urineOsm > 0 && urineNa >= 0)) return;

      const criteria = [
        { ok: serumOsm < 275, label: 'Hypotonic serum osmolality (<275)' },
        { ok: urineOsm > 100, label: 'Urine not maximally dilute (>100)' },
        { ok: urineNa > 30, label: 'Urine sodium elevated (>30)' },
        { ok: euvolemia, label: 'Clinical euvolemia present' },
        { ok: endo, label: 'Adrenal/thyroid disorders excluded' },
        { ok: noDiuretic, label: 'No active diuretic effect' }
      ];

      const met = criteria.filter((c) => c.ok);
      const status = met.length >= 5 ? 'SIADH strongly supported' : (met.length >= 4 ? 'SIADH possible' : 'SIADH less likely');
      container.querySelector('#result').innerHTML = `
        <div><strong>${status}</strong></div>
        <div>Criteria met: ${met.length}/6</div>
        <ul>${criteria.map((c) => `<li>${c.ok ? '✅' : '❌'} ${c.label}</li>`).join('')}</ul>
      `;
    });
  }
}
