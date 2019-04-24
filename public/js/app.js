const weatherForm = document.querySelector('form')
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