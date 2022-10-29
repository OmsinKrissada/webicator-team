fetch('https://gamertocoder.garena.co.th/api/minigames')
	.then(res => res.json())
	.then(data => {

		const str = data.map(g => {

			return `<li><p>${g.name}</p><img src="${g.icon}" width="100"></li>`;

		});
		console.log(str);

		const ulELement = document.querySelector('#panel>ul');
		ulELement.insertAdjacentHTML('beforeend', str.join(''));

	});
