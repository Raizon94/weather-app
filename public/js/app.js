const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#one')
const messageTwo = document.querySelector('#two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading...'
  const location = search.value

  fetch('http://localhost:3000/weather?address=' + location).then((res) => {
    res.json().then((data) => {
      console.log(data)
      if(data.error) {
        messageOne.textContent = ''
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = ''
        messageOne.textContent = 'There is a temperature of ' + data.temp + ' and a humidity of ' + data.humidity + ' in ' + data.location
      }
    })
  })
})
