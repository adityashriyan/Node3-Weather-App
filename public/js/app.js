const weatherForm = document.querySelector('form')
const geolocator = document.querySelector('#geolocator')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const userAddress = search.value
    messageOne.textContent = 'Loading Weather Forecast...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + userAddress).then((response) => {
        response.json().then(({ location = '', address = '', forecast = '', error = ''}) => {
            if(error != '') {
                messageOne.textContent = 'Error: ' + error
                messageTwo.textContent = ''
            }
            else {
                messageOne.textContent = 'Location: ' + location
                messageTwo.textContent = 'Forecast: ' + forecast
            }
        })
    })
})
  
geolocator.addEventListener('click', (e) => {
    

    if (!navigator.geolocation) {

        messageOne.textContent = 'Geolocation is not supported by your browser'
    
    } else {

        messageOne.textContent = 'Locating…'

        navigator.geolocation.getCurrentPosition((position) => {
            const userLatitude  = position.coords.latitude
            const userLongitude = position.coords.longitude

            messageOne.textContent = 'Loading Weather Forecast...'
            messageTwo.textContent = ''

            fetch('/weather?latitude=' + encodeURIComponent(userLatitude) + '&longitude=' + encodeURIComponent(userLongitude)).then((response) => {
                response.json().then(({ location = '', forecast = '', error = ''}) => {
                    if(error != '') {
                        messageOne.textContent = 'Error: ' + error
                        messageTwo.textContent = ''
                    }
                    else {
                        messageOne.textContent = 'Location: ' + location
                        messageTwo.textContent = 'Forecast: ' + forecast
                    }
                })
            })

            // mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
            // mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`
        }, () => {
            messageOne.textContent = 'Error: Unable to retrieve your location'
            messageTwo.textContent = ''
        })
    }
})