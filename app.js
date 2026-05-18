const gamesEl = document.getElementById("games");

const games = await fetch("games.json")
  .then(r => r.json());

const params = new URLSearchParams(location.search);
const currentGame = params.get("game");

if (currentGame) {
  if (!games.includes(currentGame)) {
    document.body.innerHTML = "Game not found";
    throw new Error("Game not found");
  }

  document.body.innerHTML = `
  <div style="text-align: left; margin: 0; padding: 20px; background: black; color: whitesmoke; font-family: Arial;">
      <a href="/" style="color: white;">← Back to Homepage</a><h3 style="text-align: center;">PGIS</h3>
      </div>
        <iframe id="frame" src="games/${currentGame}.html" style="height: 638px; width: 100%; max-width: 1500px; border: none; display: block; margin: 20px auto;"  title="game"></iframe>

        <button id="fullscreenBtn" style="position: fixed; top: 20px; left: 330px; z-index: 999999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;" onClick="openFullscreen()">Fullscreen</button>
        <script>
function openFullscreen() {
  const iframe = document.getElementById("frame");
  
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) { /* Safari */
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) { /* IE11 */
    iframe.msRequestFullscreen();
  }
}
</script>
        <button style="position: fixed; top: 20px; left: 410px; z-index: 999999; background: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px; border: medium; cursor: pointer;" onClick="loadUrl()">Open in about:blank</button>
        <script>
      function loadUrl() {
        const win = window.open("about:blank");
    if (!win) return;

    win.document.open();
    win.document.write(document.documentElement.outerHTML);
    win.document.close();
  };
        </script>
        <button id="cloakBtn" style="position: fixed; top: 20px; left: 548px; z-index: 99999; border: medium; cursor: pointer; background-color: rgb(68, 68, 68); color: whitesmoke; border-radius: 5px;">Cloak tab</button>
        <script>
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
        </script>
  </div>
        `;
} else {
  gamesEl.innerHTML = games.map(game => `
    <div class="gamediv"><b>${game}</b><img src="games/${game}.png" alt="game image" width="100px" height="100px"><a href="?game=${game}"><button>play</button></a></div>
  `).join("");
}
