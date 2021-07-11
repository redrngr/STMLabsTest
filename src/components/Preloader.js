class PreloaderComponent {
  constructor(src) {
    this.element = this.create(src)
  }
  create(src) {
    const el = document.createElement('div');
    el.className = 'loader';
    el.innerHTML = `<img src=${src} alt="Loader image">`
    return el;
  }
  addToDOM(container) {
    container.prepend(this.element);
  }
  deleteFromDOM() {
    this.element.remove();
  }
}

export default PreloaderComponent;