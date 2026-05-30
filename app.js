const gamesEl = document.getElementById("games");

let games = [];

const params = new URLSearchParams(location.search);
const currentGame = params.get("lesson");

async function getGames() {
  if (!games.length) {
    games = await fetch("games.json").then(r => r.json());
  }

  return games;
}

if (currentGame) {
  (async () => {
    const games = await getGames();

    if (!games.includes(currentGame)) {
      document.body.innerHTML = "Game not found";
      throw new Error("Game not found");
    }

    document.body.innerHTML = `
    <div style="text-align: left; margin: 0; padding: 20px; background: black; color: whitesmoke; font-family: Arial;">
      <a href="/" style="color: white;">← Back to Homepage</a>
      <a href="games/${currentGame}.html" download style="margin-left: 12px;">Download game</a>
      <h3 style="text-align: center;">PGIS</h3>
    </div>

    <iframe
      id="frame"
      src="games/${currentGame}.html"
      style="height: 638px; width: 100%; max-width: 1500px; border: none; display: block; margin: 20px auto;"
      title="game">
    </iframe>

    <button
      id="fullscreenBtn"
      style="position: fixed; top: 20px; left: 330px; z-index: 999999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Fullscreen
    </button>

    <button
      id="aboutBlankBtn"
      style="position: fixed; top: 20px; left: 410px; z-index: 999999; background: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px; border: medium; cursor: pointer;">
      Open in about:blank
    </button>

    <button
      id="cloakBtn"
      style="position: fixed; top: 20px; left: 548px; z-index: 99999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">
      Cloak tab
    </button>
    `;

    window.openFullscreen = function () {
      const iframe = document.getElementById("frame");

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    };

    document
      .getElementById("fullscreenBtn")
      .addEventListener("click", openFullscreen);

    window.loadUrl = function () {
      const win = window.open("about:blank");

      if (!win) return;

      win.document.open();
      win.document.write(document.documentElement.outerHTML);
      win.document.close();
    };

    document
      .getElementById("aboutBlankBtn")
      .addEventListener("click", loadUrl);

    function cloakTab() {
      const btn = document.getElementById("cloakBtn");

      let toggled = false;

      const originalTitle = document.title;

      function setFavicon(url) {
        let link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");

        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = url;

        document.head.appendChild(link);
      }

      const originalFavicon =
        document.querySelector("link[rel~='icon']")?.href || "";

      btn.onclick = function () {
        toggled = !toggled;

        if (toggled) {
          document.title = "Google Classroom";

          setFavicon(
            "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16"
          );
        } else {
          document.title = originalTitle;
          setFavicon(originalFavicon);
        }
      };
    }

    cloakTab();
  })();
}

window.loadGames = async function () {
  const games = await getGames();

  gamesEl.innerHTML = games.map(game => `
    <div class="gamediv">
      <b>${game}</b>
      <img
        src="games/${game}.png"
        alt="game image"
        width="100"
        height="100">
      <a href="?lesson=${game}">
        <button>play</button>
      </a>
    </div>
  `).join("");
};



window.Home = async function () {
  const html = await fetch("/index.html").then(r => r.text());
  const doc = new DOMParser().parseFromString(html, "text/html");

  document.getElementById("games").innerHTML =
    doc.getElementById("games").innerHTML;
};

window.proxy = async function () {
    document.getElementById("games").innerHTML = `
      <iframe style="width: 100%; height: 100vh;" src="https://homework--spmspy0800.replit.app"></iframe>
    `;
};

window.settings = async function () {
    document.getElementById("games").innerHTML = `
       <h2>Panic key</h2>
  <h3>The panic key is <b>ctrl + q</b></h3>
  
  <p style="display: inline-block;">Panic key url:</p> 
<input id="panicUrl" type="text" placeholder="google.com">
  <hr>
          `;
};


window.test = async function () {
    document.getElementById("games").innerHTML = `
      <h1 class="main-text">test</h1>
      <p>this is an example page in pgis 3</p>
    `;
};









document.addEventListener("change", (e) => {
  if (e.target && e.target.id === "panicUrl") {
    saveUrl(e.target.value);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.target && e.target.id === "panicUrl" && e.key === "Enter") {
    saveUrl(e.target.value);
  }

  if (e.ctrlKey && e.key.toLowerCase() === "q") {
    e.preventDefault();
    window.location.href =
      localStorage.getItem("redirectUrl") || "https://google.com";
  }
});

function saveUrl(value) {
  let url = value.trim();
  if (!url) return;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  localStorage.setItem("redirectUrl", url);
}
