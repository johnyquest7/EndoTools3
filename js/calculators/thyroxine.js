export default class Thyroxine {
  constructor(){ this.name='Thyroxine dose weight based'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Weight (pounds)</label><input id="lb" type="number" step="0.01"></div></div><button class="calc-button" id="calc">Calculate</button><div class="result" id="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const lb=parseFloat(container.querySelector('#lb').value);if(!(lb>0))return;const dose=(lb/2.2)*1.6;container.querySelector('#result').textContent=`Thyroxine dose: ${dose.toFixed(2)}`;});
  }
}
