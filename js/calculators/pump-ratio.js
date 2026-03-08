export default class PumpRatio {
  constructor(){ this.name='Type 1 pump ratios'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Total daily insulin</label><input id="t" type="number" step="0.01"></div></div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const t=parseFloat(container.querySelector('#t').value);if(!(t>0))return;container.querySelector('#result').textContent=`IC ratio: ${(500/t).toFixed(2)} | ISF: ${(1800/t).toFixed(2)}`;});
  }
}
