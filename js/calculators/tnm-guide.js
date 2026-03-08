export default class TNMGuide {
  constructor(){ this.name='TNM reference'; }
  render(container){
    container.innerHTML = `<iframe class="reference" src="TNM.html" title="TNM"></iframe>`;
  }
}
