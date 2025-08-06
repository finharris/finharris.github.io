const scrollBar = document.querySelector('#scrollProgress');
const header = document.querySelector('#header');
const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');


var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
document.addEventListener('scroll', function(e) {
	const pos = 100/limit * window.scrollY;
	console.log(`scrollPos: ${pos}`)

	if (pos > 0.5) {
		header.classList.add('bottomShadow');
		scrollBar.classList.remove('bottomBorder');
	} else {
		header.classList.remove('bottomShadow');
		scrollBar.classList.add('bottomBorder');
	}

	if (pos > 99.9 || pos < 0.1) {
		scrollBar.value = Math.round(pos)
	} else {
		scrollBar.value = pos
	}
})

searchButton.addEventListener('click', () => {
	const searchValue = searchBar.value;
	if (searchValue) {
		console.log('searching: ' + searchValue);
		window.open('https://www.google.com/search?q=' + searchValue);
	}
	// https://www.google.com/search?q=${searchBar.value}
})