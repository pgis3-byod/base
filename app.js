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
      <a href="/" style="color: white;">← Back to Homepage</a><h3 style="text-align: center;">PGIS</h3>
        <iframe src="games/${currentGame}.html" style="height: 638px; width: 100%; max-width: 1500px; border: none; display: block; margin: 20px auto;"  title="${game}"></iframe>
  `;
} else {
  gamesEl.innerHTML = games.map(game => `
    <div class="gamediv"><b>${game}</b><img src="" alt="game image" width="100px" height="100px"><a href="?game=${game}"><button>play</button></a></div>
  `).join("");
}
