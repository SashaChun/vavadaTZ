import photo1 from '../img/games/Gates-of-Olympus.jpg';
import photo2 from '../img/games/Без названия.jpg';
import photo3 from '../img/games/golden-fate.webp';
import photo4 from '../img/games/c3e2a6a9c4dc5b924a250dc05f8e7736.webp';
import photo5 from '../img/games/c1fdc4e1e3.webp';
import photo6 from '../img/games/lucky-penny.png';
import photo8 from '../img/games/pateplay_golden_fate.webp';
import photo10 from '../img/games/Coin-Strike-Hold-and-Win-1-1.jpeg';
import photo11 from '../img/games/images.jpg';
import photo12 from '../img/games/gamePicDark.svg';

const games = [
  { name: 'Gates of Olympus', photo: photo1 },
  { name: 'Без названия', photo: photo2 },
  { name: 'Golden Fate', photo: photo3 },
  { name: 'Game Name 4', photo: photo4 },
  { name: 'Game Name 5', photo: photo5 },
  { name: 'Lucky Penny', photo: photo6 },
  { name: 'Pateplay Golden Fate', photo: photo8 },
  { name: 'Coin Strike Hold and Win', photo: photo10 },
  { name: 'Slot Images', photo: photo11 },
  { name: 'Dark Game Pic', photo: photo12 },
];

const gameListContainer = document.querySelector('.game-list');
const searchInput = document.querySelector('.search');
const searchButton = document.querySelector('.btn--search');

function renderGames(gameItems) {
  gameListContainer.innerHTML = '';

  gameItems.forEach(game => {
    const gameItem = document.createElement('div');
    gameItem.classList.add('item');

    const gameImage = document.createElement('img');
    gameImage.src = game.photo;
    gameImage.alt = game.name;
    gameImage.classList.add('game-img');

    const playButton = document.createElement('button');
    playButton.classList.add('play-btn');
    playButton.innerText = 'Грати';

    gameItem.appendChild(gameImage);
    gameItem.appendChild(playButton);
    gameListContainer.appendChild(gameItem);
  });
}

renderGames(games);

function searchGames() {
  const searchQuery = searchInput.value.toLowerCase().trim();

  if (searchQuery === '') {
    renderGames(games);
  } else {
    const filteredGames = games.filter(game =>
      game.name.toLowerCase().includes(searchQuery)
    );
    renderGames(filteredGames);
  }
}

searchButton.addEventListener('click', searchGames);

searchInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    searchGames();
  }
});
