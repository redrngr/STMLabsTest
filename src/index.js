import PreloaderComponent from './components/Preloader.js';
import UserListComponent from './components/UserList.js';
import FilterComponent from './components/Filter.js';

class User {
  constructor(user) {
    this.picture = user.picture;
    this.name = user.name.first + ' ' + user.name.last;
    this.location = user.location.state + ', ' + user.location.city;
    this.email = user.email;
    this.phone = user.phone;
    this.registered = user.registered.date;
  }
}

const state = { users: [] };

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.container');
  const loader = new PreloaderComponent('../assets/loading.svg')
  loader.addToDOM(container);
  await fetch('https://randomuser.me/api/?results=15')
    .then(response => response.json())
    .then(data => {
      state.users = data.results.map(el => new User(el));
      loader.deleteFromDOM();
      renderApp(container);
    })
    .catch(console.log);
});

function renderApp(container) {
  const form = container.querySelector('.form');
  const userlist = container.querySelector('.userlist');

  const renderUserList = (users) => {
    userlist.innerHTML = (users.length === 0) ?
      '<span class="notfound">User not found</span>' :
      UserListComponent(users);
  };

  FilterComponent.addToDOM(form);
  renderUserList(state.users);


  let onChange = (event) => {
    let searchText = event.target.value.toLowerCase();
    renderUserList(state.users.filter(user => user.name.toLowerCase().includes(searchText)));
  };

  const debounce = (fn, wait) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), wait);
    }
  };

  onChange = debounce(onChange, 500);

  const search = form.querySelector('input[type="search"]');

  search.addEventListener("input", onChange);

  form.addEventListener("reset", () =>
    search.value ? renderUserList(state.users) : null);
};

