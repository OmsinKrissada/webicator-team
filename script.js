let games;
fetch('https://gamertocoder.garena.co.th/api/minigames')
	.then(res => res.json())
	.then(data => {
		games = data;
		onFetched();
	});


/**
 * Immediately triggered after successful garena API fetch
 */
async function onFetched() {

	// construct panel list

	const str = games.map(g => {
		return `<li onclick="jumpTo(${g.no})"><p>${g.name}</p><img src="${g.icon}" width="100"></li>`;
	});
	const ulELement = document.querySelector('#panel>ul');
	ulELement.insertAdjacentHTML('beforeend', str.join(''));


	const titleHolder = document.getElementById('title-holder');
	const descriptionHolder = document.getElementById('description-holder');
	const iconHolder = document.getElementById('icon-holder');
	for (const game of games) {

		// construct title

		const titleElement = document.createElement('h2');
		titleElement.innerText = game.name.toUpperCase();
		titleElement.classList.add(`game-${game.no}`, 'up');
		titleHolder.appendChild(titleElement);

		// construct genre + description

		const descElement = document.createElement('p');
		descElement.innerHTML += `<span>${game.genre.join(' / ')}</span>\n${game.description}`;
		descElement.classList.add(`game-${game.no}`, 'right');
		descriptionHolder.appendChild(descElement);

		// construct icon

		const iconElement = document.createElement('img');
		iconElement.src = game.icon;
		iconElement.classList.add(`game-${game.no}`, 'left');
		iconHolder.appendChild(iconElement);
	}
}

let currentGameId = null;

let previousTimeout;

/**
 * 
 * @param {string} url image url
 */
function fadeBackground(url) {

	const overlayStr = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';

	clearTimeout(previousTimeout); // prevent spam click

	console.log(url);
	const front = document.querySelector('.wallpaper.front');
	const back = document.querySelector('.wallpaper.back');

	console.log('fading');
	back.setAttribute('style', `background-image: ${overlayStr}, url(${url})`);
	front.classList.add('hidden');
	previousTimeout = setTimeout(() => {
		console.log('timeout triggered');
		front.setAttribute('style', `background-image: ${overlayStr}, url(${url})`);
		front.classList.remove('hidden');
	}, 1000);
}


const imageBias = {
	1: 4,
	4: 2,
	7: 'https://wallpaperaccess.com/full/3409371.jpg', // ทางทีมงานไม่ได้มีภาพให้ครับ
	10: 'https://i.ytimg.com/vi/KjgtSJ3msRs/maxresdefault.jpg',
};

/**
 * 
 * @param {number} id game id 
 */
function setCoverDisplay(id) {
	if (currentGameId) {
		for (const element of document.getElementsByClassName(`game-${currentGameId}`)) {
			element.classList.remove('active');
		}
	}
	for (const element of document.getElementsByClassName(`game-${id}`)) {
		element.classList.add('active');
	}

	currentGameId = id;

	const selectedGame = games.filter(g => g.no == id)[0];
	if (imageBias[selectedGame.no] && isNaN(imageBias[selectedGame.no])) {
		fadeBackground(imageBias[selectedGame.no]);
	} else {
		const index = imageBias[selectedGame.no] ? imageBias[selectedGame.no] - 1 : 0;
		fadeBackground(selectedGame.images[index]);
	}
}


/**
 * 
 * @param {number} id game id
 */
function jumpTo(id) {
	document.getElementById('overview').setAttribute('style', 'display: none;');
	setCoverDisplay(id);
	// alert(id);
}


