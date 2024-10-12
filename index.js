const input = document.getElementById("search-input");
const body = document.querySelector(".body");

async function fetchUser(userName) {
  try {
    const responce = await fetch(`https://api.github.com/users/${userName}`);
    const result = await responce.json();

    if (result.message == "Not Found") {
      body.innerHTML = `<h2 class="not-found">User Not Found</h2>`;
      return;
    }
    displayData(result);
  } catch (err) {
    alert(err.message);
    body.innerHTML = ``;
    return;
  }
}

document.getElementById("search").addEventListener("click", async (e) => {
  body.innerHTML = `<div class="loader-container"><span class="loader"></span></div>`;

  const searchValue = input.value;
  input.value = "";
  fetchUser(searchValue);
});

function displayData({
  avatar_url,
  bio,
  followers,
  following,
  name,
  html_url,
  public_repos,
}) {
  body.innerHTML = `<div class="left">
          <img
            src=${avatar_url}
            alt="profile-pic"
          />
          <div class="user-details">
            <p class="name">${name ? name : ""}</p>
            <p class="bio">${bio ? bio : ""}</p>
          </div>
        </div>
        <div class="right">
          <div class="repo">
            <div>
              <div>Follower</div>
              <div>${followers}</div>
            </div>
            <div>
              <div>Following</div>
              <div>${following}</div>
            </div>
            <div>
              <div>Repo</div>
              <div>${public_repos}</div>
            </div>
          </div>
          <div class="view-profile">
            <a href=${html_url} target="_blank">View Profile</a>
          </div>
        </div>`;
}
