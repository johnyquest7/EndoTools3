class EndoCalc {
  constructor() {
    this.mainContainer = document.getElementById('main-container');
    this.calculatorContainer = document.getElementById('calculator-container');
    this.deferredInstallPrompt = null;
    this.setupEventListeners();
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.handleRoute();
  }

  setupEventListeners() {
    window.addEventListener('hashchange', () => this.handleRoute());

    document.querySelectorAll('.calculator-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.hash = link.getAttribute('href');
      });
    });

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('back-button')) {
        event.preventDefault();
        window.location.hash = '';
      }
    });
  }

  setupInstallPrompt() {
    const installButton = document.getElementById('install-button');
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredInstallPrompt = event;
      installButton.classList.remove('hidden');
    });

    installButton?.addEventListener('click', async () => {
      if (!this.deferredInstallPrompt) {
        alert('Use your browser menu and choose "Install app" or "Add to Home Screen".');
        return;
      }
      this.deferredInstallPrompt.prompt();
      await this.deferredInstallPrompt.userChoice;
      this.deferredInstallPrompt = null;
      installButton.classList.add('hidden');
    });
  }

  async handleRoute() {
    const calculatorId = window.location.hash.replace('#', '');
    if (!calculatorId) {
      this.mainContainer.classList.remove('hidden');
      this.calculatorContainer.classList.add('hidden');
      this.calculatorContainer.innerHTML = '';
      return;
    }

    this.mainContainer.classList.add('hidden');
    this.calculatorContainer.classList.remove('hidden');

    try {
      const module = await import(`./calculators/${calculatorId}.js`);
      const calculator = new module.default();
      this.calculatorContainer.innerHTML = `
        <div class="calculator-page">
          <div class="calculator-header">
            <button class="back-button">← Back to Menu</button>
            <h2>${calculator.name}</h2>
          </div>
          <div class="calculator-content"></div>
        </div>
      `;
      calculator.render(this.calculatorContainer.querySelector('.calculator-content'));
    } catch (error) {
      this.calculatorContainer.innerHTML = `
        <div class="calculator-page">
          <div class="calculator-header">
            <button class="back-button">← Back to Menu</button>
            <h2>Error</h2>
          </div>
          <div class="calculator-content"><p>Unable to load calculator: ${calculatorId}</p></div>
        </div>
      `;
      console.error(error);
    }
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (error) {
        console.error('Service worker registration failed', error);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.endoCalc = new EndoCalc();
});
