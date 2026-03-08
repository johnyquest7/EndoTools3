export default class NoduleVolume {
  constructor(){ this.name='Thyroid nodule volume calculator'; }
  render(container){
    container.innerHTML=`<div class="form-grid">
      <div><label>Baseline length</label><input id="bl" type="number" step="0.01"></div>
      <div><label>Baseline width</label><input id="bw" type="number" step="0.01"></div>
      <div><label>Baseline depth</label><input id="bd" type="number" step="0.01"></div>
      <div><label>Latest length</label><input id="ll" type="number" step="0.01"></div>
      <div><label>Latest width</label><input id="lw" type="number" step="0.01"></div>
      <div><label>Latest depth</label><input id="ld" type="number" step="0.01"></div>
    </div><button id="calc" class="calc-button">Calculate</button><div id="result" class="result"></div>`;
    container.querySelector('#calc').addEventListener('click',()=>{const vals=['bl','bw','bd','ll','lw','ld'].map(id=>parseFloat(container.querySelector('#'+id).value));if(vals.some(v=>!(v>0)))return;const [bl,bw,bd,ll,lw,ld]=vals;const b=0.52*(bl*bw*bd);const l=0.52*(ll*lw*ld);const c=(l/b)*100;container.querySelector('#result').textContent=`Baseline: ${b.toFixed(2)} | Latest: ${l.toFixed(2)} | Change: ${c.toFixed(2)}%`;});
  }
}
