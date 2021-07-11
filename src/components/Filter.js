class FilterComponent {
  static create() {
    const form = document.createElement('form');
    form.innerHTML = `<input type="search" placeholder="Search...">
    <input type="reset" value="RESET">`;
    return form;
  }
  static addToDOM(container) {
    container.prepend(this.create());
  }
}

export default FilterComponent;