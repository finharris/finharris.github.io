window.addEventListener('load', () => {
    const locatoin = document.querySelector('#location');
    const tempNum = document.querySelector('#temp');
    const description = document.querySelector('#description');
    const tempSetion = document.querySelector('#temp-section');
    const CFspan = document.querySelector('#CF');
    const container = document.querySelector('#container');
    const APIkey = 'ad944aa634a4c2d842c47f33d9174db1';
    var lat;
    var long;
    var currentPos;
    
    if (navigator.geolocation) {
        currentPos = navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    document.querySelector('title').textContent = 'Weather - ' + data.name;
                    CFspan.textContent = 'C';
                    locatoin.textContent = data.name + ', ' +data.sys.country;
                    var tempC = Math.round(data.main.temp - 273.15);
                    tempNum.textContent = tempC;
                    description.textContent = data.weather[0].description;
                    container.style.opacity = '100%';

                    tempSetion.addEventListener('click', () => {
                        if (CFspan.textContent === 'C') {
                            tempNum.textContent = (tempC * (9/5) + 32);
                            CFspan.textContent = 'F';
                        } else {
                            tempNum.textContent = tempC;
                            CFspan.textContent = 'C';
                        }
                    })
                })
        });
        } else {
            alert('Ensure the site has location permissions and refresh the page.');
        }
})