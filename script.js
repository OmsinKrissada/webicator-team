let games;
fetch('https://gamertocoder.garena.co.th/api/minigames')
	.then(res => res.json())
	.then(data => {
		games = data;
		onFetched();
	});


async function onFetched() {

	// construct panel list

	const str = games.map(g => {
		return `<li onclick="jumpTo(${g.no})"><img src="${g.icon}" width="100"></li>`;
	});
	// console.log(str);

	const ulELement = document.querySelector('#panel>ul');
	ulELement.insertAdjacentHTML('beforeend', str.join(''));

	// construct title

	const titleHolder = document.getElementById('title-holder');
	for (const game of games) {
		const element = document.createElement('h2');
		element.innerText = game.name.toUpperCase();
		element.classList.add('game', `game-${game.no}`, 'left');
		titleHolder.appendChild(element);
	}
}

let currentGameId = null;

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
}


/**
 * 
 * @param {number} id game id
 */
function jumpTo(id) {
	setCoverDisplay(id);
	// alert(id);
}