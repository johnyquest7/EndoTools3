export default class FeCa {
  constructor(){ this.name='Familial hypocalciuric hypercalcemia (FeCa)'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>24 hr U Calcium</label><input id="uca" type="number" step="0.01"></div><div><label>24 hr U Creatinine</label><input id="ucr" type="number" step="0.01"></div><div><label>Serum Calcium</label><input id="sca" type="number" step="0.01"></div><div><label>Serum Creatinine</label><input id="scr" type="number" step="0.01"></div></div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const uca=parseFloat(container.querySelector('#uca').value);const ucr=parseFloat(container.querySelector('#ucr').value);const sca=parseFloat(container.querySelector('#sca').value);const scr=parseFloat(container.querySelector('#scr').value);if(!(uca>0&&ucr>0&&sca>0&&scr>0))return;const value=(uca/sca)/(ucr/scr);container.querySelector('#result').textContent=`FeCa: ${value.toFixed(4)}`;});
  }
}
