const UserListComponent = (users) => {
  let fields = `
    <thead>
      <tr>${Object.keys(users[0]).map(field => `<th>${field.toUpperCase()}</th>`).join(' ')}</tr>
    </thead>`;
  let tbody = users.map(user =>
    `<tr>
      <td class="tooltip" style="padding-left: 0;">
        <div class="tooltip-data">
          <img src="${user.picture.large}" alt="Photo"/>
          <span>${user.name}</span>
        </div>
          <img src="${user.picture.thumbnail}" alt="Photo"/>
      </td>
      <td>${user.name}</td>
      <td>${user.location}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${new Date(user.registered).toLocaleString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</td>
    </tr>`
  ).join(' ');
  return `<table>${fields}<tbody>${tbody}</tbody></table>`;
}

export default UserListComponent;


