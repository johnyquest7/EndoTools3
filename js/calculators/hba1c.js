export default class HbA1c {
  constructor(){ this.name='HbA1c - Fructosamine - Glucose'; }
  render(container){
    container.innerHTML=`<div class="form-grid"><div><label>HbA1c</label><input id="a1c" type="number" step="0.01"></div><div><label>Fructosamine</label><input id="fr" type="number" step="0.01"></div><div><label>Glucose</label><input id="gl" type="number" step="0.01"></div></div><div><button class="calc-button" id="from-a1c">From HbA1c</button> <button class="calc-button" id="from-fr">From Fructosamine</button> <button class="calc-button" id="from-gl">From Glucose</button></div><div id="result" class="result"></div>`;
    const a1c=container.querySelector('#a1c'),fr=container.querySelector('#fr'),gl=container.querySelector('#gl'),res=container.querySelector('#result');
    container.querySelector('#from-a1c').addEventListener('click',()=>{const v=parseFloat(a1c.value);if(!Number.isFinite(v))return;gl.value=((v*28.7)-46.7).toFixed(0);fr.value=((v-1.61)*58.82).toFixed(2);res.textContent='Updated from HbA1c';});
    container.querySelector('#from-fr').addEventListener('click',()=>{const v=parseFloat(fr.value);if(!Number.isFinite(v))return;const h=(0.017*v)+1.61;a1c.value=h.toFixed(2);gl.value=((h*28.7)-46.7).toFixed(0);res.textContent='Updated from Fructosamine';});
    container.querySelector('#from-gl').addEventListener('click',()=>{const v=parseFloat(gl.value);if(!Number.isFinite(v))return;const h=(v+46.7)/28.7;a1c.value=h.toFixed(2);fr.value=((h-1.61)*58.82).toFixed(2);res.textContent='Updated from Glucose';});
  }
}
