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
 <h2>Tab cloak</h2>

    <button id="toggleButton"></button>
<br>
    <p style="display: inline-block;">Title: </p>
    <input id="cloakTitleInput" type="text" placeholder="Google Classroom">
<br>
    <p style="display: inline-block;">Favicon URL: </p>
    <input id="cloakIconInput" type="text" placeholder="https://...">

    <hr>

    <h2>URL cloak</h2>
    <button id="aboutBlankBtn">Open site in about:blank</button> <button id="blobBtn">Open site in blob:</button>
    <hr>
    <h2>Theme</h2>
    <button>Light Mode</button> <button>particles on/off</button>
          `;
  
  updateToggleButton();

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
  alert("Saved");
}










const TOGGLE_KEY = "buttonEnabled";
const CLOAK_TITLE_KEY = "cloakTitle";
const CLOAK_ICON_KEY = "cloakIcon";

const originalTitle = document.title;
const originalFavicon =
  document.querySelector("link[rel~='icon']")?.href || "";

function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = url;
}

function applyCloak() {
  const enabled = localStorage.getItem(TOGGLE_KEY) === "true";

  const title =
    localStorage.getItem(CLOAK_TITLE_KEY) || "Google Classroom";

  const icon =
    localStorage.getItem(CLOAK_ICON_KEY) ||
    "https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://staticin.pages.dev/settings&size=16";

  if (enabled) {
    document.title = title;
    setFavicon(icon);
  } else {
    document.title = originalTitle;
    setFavicon(originalFavicon);
  }

  updateToggleButton();
}

function updateToggleButton() {
  const button = document.getElementById("toggleButton");
  if (!button) return;

  const enabled = localStorage.getItem(TOGGLE_KEY) === "true";
  button.textContent = enabled ? "ON" : "OFF";
}

document.addEventListener("click", (e) => {
  if (e.target?.id === "toggleButton") {
    const enabled = localStorage.getItem(TOGGLE_KEY) === "true";
    localStorage.setItem(TOGGLE_KEY, (!enabled).toString());
    applyCloak();
  }
});

document.addEventListener("input", (e) => {
  if (e.target?.id === "cloakTitleInput") {
    localStorage.setItem(CLOAK_TITLE_KEY, e.target.value);
    applyCloak();
  }

  if (e.target?.id === "cloakIconInput") {
    localStorage.setItem(CLOAK_ICON_KEY, e.target.value);
    applyCloak();
  }
});

if (localStorage.getItem(TOGGLE_KEY) === null) {
  localStorage.setItem(TOGGLE_KEY, "false");
}

applyCloak();
















document.addEventListener("click", (e) => {
  const btn = e.target.closest("#aboutBlankBtn");
  if (!btn) return;

  const win = window.open("about:blank");

  const iframe = win.document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.src = window.location.href;

  win.document.body.style.margin = "0";
  win.document.body.appendChild(iframe);
});


document.addEventListener("click", (e) => {
  const btn = e.target.closest("#blobBtn");
  if (!btn) return;

  const html = `
    <!doctype html>
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe src="${location.href}"></iframe>
      </body>
    </html>
  `;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  window.open(url);
});
