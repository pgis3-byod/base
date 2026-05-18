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
    <iframe
      src="games/${currentGame}.html"
      style="
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        border: none;
      "
      allowfullscreen
    ></iframe>
  `;
} else {
  gamesEl.innerHTML = games.map(game => `
    <a
      href="?game=${game}"
      style="
        display:block;
        margin:10px;
        font-size:24px;
      "
    >
      ${game}
    </a>
  `).join("");
}
