export default class Steroid {
  constructor() { this.name = 'Steroid dose converter'; this.items=[['hydrocortisone',1],['cortisone',0.8],['prednisone',4],['prednisolone',4],['triamcinolone',5],['methylprednisolone',5],['dexamethasone',25],['betamethasone',30]]; }
  render(container){
    const options=this.items.map((x,i)=>`<option value="${i}">${x[0]}</option>`).join('');
    container.innerHTML=`<div class="form-grid"><div><label>Dose</label><input id="dose" type="number" step="0.01"></div><div><label>From</label><select id="from">${options}</select></div><div><label>To</label><select id="to">${options}</select></div></div><button id="calc" class="calc-button">Convert</button><div id="result" class="result"></div>`;
    const calc=()=>{const d=parseFloat(container.querySelector('#dose').value||'0');const p1=this.items[container.querySelector('#from').value][1];const p2=this.items[container.querySelector('#to').value][1];container.querySelector('#result').textContent=`Equivalent dose: ${(d*(p1/p2)).toFixed(2)}`;};
    ['#dose','#from','#to'].forEach(id=>container.querySelector(id).addEventListener('input',calc));
    container.querySelector('#calc').addEventListener('click',calc);
    calc();
  }
}
