let LIVE_RADIOS_LINK = 'https://data-rosy.vercel.app/radio.json';
let AZKAR_LINK = 'https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json';

// -------------------------------
// --- Live radios section ---
async function getRadios() {
	let radiosDiv = document.querySelector('div.radios');

	let liveRadios = await fetch(LIVE_RADIOS_LINK).then(res => res.json());

	console.log(liveRadios);

	for (let radio of liveRadios.radios) {
		let option = document.createElement('option');
		option.value = radio.id;
		option.innerText = radio.name;
		radiosDiv.querySelector('select').appendChild(option);
	}
}

getRadios();


document.addEventListener('change', async function (e) {
	if (e.target && e.target.id === 'reciterSelect') {
		let selectedReciter = e.target.value;
		let audioElement = document.getElementById('quraanAudio');
		let reciterImageElement = document.querySelector('.reciter-picture');
		let reciter = await getReciterById(selectedReciter);

		console.log(audioElement, reciterImageElement, reciter);

		audioElement.src = reciter.url;
		reciterImageElement.src = reciter.img || 'assets/logo_broken.png';
		reciterImageElement.onerror = () => { reciterImageElement.src = 'assets/logo_broken.png'; };
	}
});

async function getReciterById(id) {
	let reciters = await fetch(LIVE_RADIOS_LINK).then(res => res.json());
	return reciters.radios.find(reciter => reciter.id == id);
}
// --- End Live radios section ---
// -------------------------------

// ------------------------------
// --- Azkar section ---
async function getAzkar() {
	let azkarP = document.querySelector('p.azkar');
	let azkarData = await fetch(AZKAR_LINK).then(res => res.json());

	azkars = Object.keys(azkarData);
	let randomIndex1 = Math.floor(Math.random() * azkars.length);
	let randomIndex2 = Math.floor(Math.random() * azkarData[azkars[randomIndex1]].length);

	console.log(randomIndex1, randomIndex2, azkarData[azkars[randomIndex1]][randomIndex2]);
	azkarP.innerHTML = azkarData[azkars[randomIndex1]][randomIndex2]
		.content
		.replace(/(\r\n|\r|\n|\\n)/g, ' ')
		.replace(/['",]/g, '')
		.replace(/\s+/g, ' ')

}

getAzkar();
// --- End Azkar section ---
// ------------------------------



// ------------------------------
// --- Update the footer year ---
document.querySelector('.year').innerText = new Date().getFullYear();
// ------------------------------

