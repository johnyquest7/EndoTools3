export default class CalciumAlbumin {
  constructor(){ this.name='Calcium corrected for albumin'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Calcium</label><input id="ca" type="number" step="0.01"></div><div><label>Albumin</label><input id="alb" type="number" step="0.01"></div></div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const ca=parseFloat(container.querySelector('#ca').value);const alb=parseFloat(container.querySelector('#alb').value);if(!Number.isFinite(ca)||!Number.isFinite(alb))return;const corrected=(0.8*(4-alb))+ca;container.querySelector('#result').textContent=`Corrected calcium: ${corrected.toFixed(2)}`;});
  }
}
