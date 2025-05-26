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

// Import Firebase authentication
import './firebase-auth';

const games = [
  {
    name: 'Gates of Olympus',
    photo: photo1,
    description: 'Gates of Olympus is an exciting slot game from Pragmatic Play featuring Zeus, the Greek god of thunder. This 6x5 video slot offers high volatility gameplay with a 96.5% RTP. Trigger the free spins feature to enjoy multipliers that can lead to massive wins up to 5,000x your stake!'
  },
  {
    name: 'Без названия',
    photo: photo2,
    description: 'This mysterious slot game offers players a unique gaming experience with stunning graphics and engaging gameplay. Featuring multiple paylines and bonus features, it provides plenty of opportunities for big wins and entertainment.'
  },
  {
    name: 'Golden Fate',
    photo: photo3,
    description: 'Golden Fate is a luxurious slot game with an Asian theme. The game features beautiful golden symbols, free spins, and multipliers. With its medium volatility and 96.2% RTP, it offers a balanced gameplay experience for all types of players.'
  },
  {
    name: 'Game Name 4',
    photo: photo4,
    description: 'Game Name 4 is an innovative slot with unique mechanics and stunning visuals. Players can enjoy multiple bonus features, including wilds, scatters, and a progressive jackpot that can lead to life-changing wins.'
  },
  {
    name: 'Game Name 5',
    photo: photo5,
    description: 'Game Name 5 takes players on an adventure through a fantasy world. With its immersive storyline and character progression features, this slot offers more than just spinning reels. Unlock special abilities and bonus rounds as you progress.'
  },
  {
    name: 'Lucky Penny',
    photo: photo6,
    description: 'Lucky Penny is a classic slot game with an Irish theme. Find the pot of gold at the end of the rainbow with lucky symbols, free spins, and multipliers. The charming leprechaun might just bring you the luck you need for a big win!'
  },
  {
    name: 'Pateplay Golden Fate',
    photo: photo8,
    description: 'Pateplay Golden Fate combines stunning visuals with engaging gameplay mechanics. This Asian-themed slot features expanding wilds, respins, and a lucrative free spins feature. The high volatility offers the potential for massive payouts.'
  },
  {
    name: 'Coin Strike Hold and Win',
    photo: photo10,
    description: 'Coin Strike Hold and Win features the popular Hold and Win mechanic. Collect coins to trigger the bonus game where you can win one of four jackpots. With its medium-high volatility and frequent small wins, it keeps the excitement going.'
  },
  {
    name: 'Slot Images',
    photo: photo11,
    description: 'Slot Images brings a fresh perspective to classic slot gaming. With its unique visual style and innovative bonus features, it stands out from the crowd. Trigger the special image collection feature to unlock additional rewards.'
  },
  {
    name: 'Dark Game Pic',
    photo: photo12,
    description: 'Dark Game Pic takes players into a mysterious and atmospheric world. This dark-themed slot features haunting visuals and sound effects. The unique night mode feature increases all wins during the midnight hour bonus round.'
  },
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

    // Add click event to show game details
    gameItem.addEventListener('click', () => {
      showGameDetails(game);
    });

    // Prevent the play button from triggering the game details modal
    playButton.addEventListener('click', (event) => {
      event.stopPropagation();
      // Here you can add code to start the game
      console.log(`Starting game: ${game.name}`);
    });

    gameItem.appendChild(gameImage);
    gameItem.appendChild(playButton);
    gameListContainer.appendChild(gameItem);
  });
}

// Game details modal functionality
const modal = document.getElementById('gameModal');
const closeModal = document.querySelector('.close-modal');
const modalGameName = document.getElementById('modalGameName');
const modalGameImage = document.getElementById('modalGameImage');
const modalGameDescription = document.getElementById('modalGameDescription');
const playNowButton = document.querySelector('.btn--play');

function showGameDetails(game) {
  // Set modal content
  modalGameName.textContent = game.name;
  modalGameImage.src = game.photo;
  modalGameImage.alt = game.name;
  modalGameDescription.textContent = game.description;

  // Show modal
  modal.style.display = 'block';

  // Disable scrolling on the body when modal is open
  document.body.style.overflow = 'hidden';
}

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  }
});

// Play Now button functionality
playNowButton.addEventListener('click', () => {
  const gameName = modalGameName.textContent;
  console.log(`Starting game: ${gameName}`);
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
});

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
