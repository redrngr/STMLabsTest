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
//Хранилище состояний для целого одного массива
const state = { users: [] };

//После отрисовки ДОМа вывожу индикатор загрузки, делаю запрос к апи.
//В случае успеха, удаляю индикатор загрузки, запускаю отрисовку приложения.
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
    .catch(e => {
      console.log(e);
      container.innerHTML = '<span class="message">Something is wrong :(</span>';
    });
});

function renderApp(container) {
  const form = container.querySelector('#form');
  const userlist = container.querySelector('#userlist');

  //Функция отрисовки списка пользователей
  //(или сообщения о неудаче, если нет совпадений с текстом в фильтре).
  const renderUserList = (users) => {
    userlist.innerHTML = (users.length === 0) ?
      '<span class="message">User not found</span>' :
      UserListComponent(users);
  };

  //Отрисовка фильтра и списка пользоватлей.
  FilterComponent.addToDOM(form);
  renderUserList(state.users);

  //Обработчик события ввода текста в поле Search.
  //Отрисовывает пользователей если их имя соответствует введенному в поле значению.
  let onChange = (event) => {
    let searchText = event.target.value.toLowerCase();
    renderUserList(state.users.filter(user => user.name.toLowerCase().includes(searchText)));
  };

  //Отменяет повторную отрисовку списка пользователей в случае повторного
  //ввода раньше чем через interval миллисекунд
  const debounce = (fn, interval) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, arguments), interval);
    }
  };

  onChange = debounce(onChange, 300);

  //Вешаю прослушку событий на форму и поле ввода
  const search = form.querySelector('input[type="search"]');

  search.addEventListener("input", onChange);

  form.addEventListener("reset", () =>
    search.value ? renderUserList(state.users) : null);
};

