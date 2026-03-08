export default class RaiDose {
  constructor(){ this.name="Calculate RAI dose for Graves'"; }
  retained(g){
    if (g > 9 && g < 21) return 80;
    if (g > 20 && g < 31) return 90;
    if (g > 30 && g < 41) return 100;
    if (g > 40 && g < 51) return 120;
    if (g > 50 && g < 61) return 140;
    if (g > 60 && g < 71) return 150;
    if (g > 70 && g < 81) return 160;
    if (g > 80 && g < 91) return 170;
    if (g > 90 && g < 101) return 180;
    if (g > 100) return 200;
    return 100;
  }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>Thyroid grams</label><input id="grams" type="number"></div><div><label>RAI uptake</label><input id="rai" type="number"></div></div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const g=parseFloat(container.querySelector('#grams').value);const r=parseFloat(container.querySelector('#rai').value);if(!(g>0&&r>0))return;const result=((g*this.retained(g)*100)/r)/1000;container.querySelector('#result').textContent=`Dose: ${result.toFixed(2)}`;});
  }
}
