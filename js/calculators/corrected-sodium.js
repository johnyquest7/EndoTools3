export default class CorrectedSodium {
  constructor(){ this.name='Corrected sodium for glucose'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Sodium</label><input id="na" type="number" step="0.01"></div><div><label>Glucose</label><input id="glu" type="number" step="0.01"></div></div><button id="calc" class="calc-button">Calculate</button><div class="result" id="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const na=parseFloat(container.querySelector('#na').value);const glu=parseFloat(container.querySelector('#glu').value);if(!Number.isFinite(na)||!Number.isFinite(glu))return;const corrected=na+0.016*(glu-100);container.querySelector('#result').textContent=`Corrected Na: ${corrected.toFixed(2)}`;});
  }
}
