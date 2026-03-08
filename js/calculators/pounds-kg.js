export default class PoundsKg {
  constructor() { this.name = 'Pound to Kg'; }
  render(container) {
    container.innerHTML = `<div class="form-grid">
      <div><label>Pounds</label><input id="lb" type="number" step="0.01"></div>
      <div><label>Kilograms</label><input id="kg" type="number" step="0.01"></div>
    </div><button class="calc-button" id="convert">Convert</button><div class="result" id="result"></div>`;
    container.querySelector('#convert').addEventListener('click', () => {
      const lb = parseFloat(container.querySelector('#lb').value);
      const kg = parseFloat(container.querySelector('#kg').value);
      const result = container.querySelector('#result');
      if (Number.isFinite(lb)) {
        result.textContent = `${lb.toFixed(2)} lb = ${(lb * 0.45359237).toFixed(2)} kg`;
        container.querySelector('#kg').value = (lb * 0.45359237).toFixed(2);
      } else if (Number.isFinite(kg)) {
        result.textContent = `${kg.toFixed(2)} kg = ${(kg * 2.20462262).toFixed(2)} lb`;
        container.querySelector('#lb').value = (kg * 2.20462262).toFixed(2);
      } else {
        result.textContent = 'Enter a value in either pounds or kilograms.';
      }
    });
  }
}
