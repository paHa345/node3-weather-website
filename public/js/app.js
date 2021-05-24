console.log('client side js file loaded')

// fetch('/weather?address=vengerovo').then((response)=>{
// 	response.json().then((data)=>{
// 		if (data.error) {
// 			console.log(data.error)

// 		}else{
// 			console.log(data.address)
// 			console.log(data.data)

// 		}
		
// 	})
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




console.log(weatherForm)

weatherForm.addEventListener('submit', (e)=>{

	
	e.preventDefault()
	messageTwo.textContent = ''
	messageOne.textContent = 'Loading...'
	// console.log(`/weather?address=${search.value}`)
	fetch(`/weather?address=${search.value}`).then((response)=>{
		response.json().then((data)=>{
			if (data.error) {
				console.log(data.error)
				messageOne.textContent = data.error

			}else{
				console.log(data)
				console.log(data.location)
				messageTwo.textContent = data.location
				messageOne.textContent = data.data


			}
			
		})
	})
	console.log('Testing')

})