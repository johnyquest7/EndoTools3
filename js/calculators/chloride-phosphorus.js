export default class ChlorPhos {
  constructor(){ this.name='Chloride phosphorus ratio'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Chloride</label><input id="cl" type="number" step="0.01"></div><div><label>Phosphorous</label><input id="ph" type="number" step="0.01"></div></div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div><p class="note">Chloride phosphorus ratio > 33 suggests hyperparathyroidism.</p>`;
    container.querySelector('#calc').addEventListener('click',()=>{const cl=parseFloat(container.querySelector('#cl').value);const ph=parseFloat(container.querySelector('#ph').value);if(!(cl>0&&ph>0))return;container.querySelector('#result').textContent=`Ratio: ${(cl/ph).toFixed(2)}`;});
  }
}
