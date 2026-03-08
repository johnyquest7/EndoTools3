export default class CalcitoninDoubling {
  constructor(){ this.name='Calcitonin doubling time'; }
  render(container){
    container.innerHTML=`<p class="note">Enter at least 4 date/marker pairs.</p><div class="form-grid"><div><label>Date</label><input id="date" type="date"></div><div><label>Marker</label><input id="marker" type="number" step="0.01"></div></div><button id="add" class="calc-button">Add Pair</button> <button id="calc" class="calc-button">Calculate</button> <button id="reset" class="calc-button">Reset</button><div id="list" class="note"></div><div id="result" class="result"></div>`;
    const points=[]; const list=container.querySelector('#list');
    const days=(a,b)=>Math.round((b-a)/(1000*60*60*24))+1;
    container.querySelector('#add').addEventListener('click',()=>{const d=container.querySelector('#date').value;const m=parseFloat(container.querySelector('#marker').value);if(!d||!(m>0))return;points.push({d:new Date(d),m});points.sort((x,y)=>x.d-y.d);list.textContent=points.map(p=>`${p.d.toISOString().slice(0,10)}:${p.m}`).join(' | ');});
    container.querySelector('#calc').addEventListener('click',()=>{if(points.length<4)return;const base=points[0].d;const X=points.map(p=>days(base,p.d));const Y=points.map(p=>Math.log10(p.m));const n=points.length;const Xavg=X.reduce((a,b)=>a+b,0)/n;const Yavg=Y.reduce((a,b)=>a+b,0)/n;const XYavg=X.reduce((s,x,i)=>s+x*Y[i],0)/n;const XXavg=X.reduce((s,x)=>s+x*x,0)/n;let slope=((Xavg*Yavg)-XYavg)/((Xavg*Xavg)-XXavg);slope=Math.round(slope*1e6)/1e6;const years=((Math.log10(2)/slope)/365);const months=(years*365/30);container.querySelector('#result').textContent=`Doubling time: ${years.toFixed(2)} years (${months.toFixed(1)} months)`;});
    container.querySelector('#reset').addEventListener('click',()=>{points.length=0;list.textContent='';container.querySelector('#result').textContent='';});
  }
}
