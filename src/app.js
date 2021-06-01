const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(process.argv)

const app = express()

const port = process.env.PORT || 3000

//определяем пути для конфигурации экспресс
const publicDirectoryPath = path.join(__dirname, '../public')
const vievsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//настраиваем handlebars
app.set('view engine', 'hbs')
app.set('views', vievsPath)
hbs.registerPartials(partialPath)

//устанавливаем (определяем) директорию, где находятся файлы статики
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
	res.render('index', {
		title:'Weater App',
		name:'paHa345'
	})
})


app.get('/about',(req, res)=>{
	res.render('about', {
		title:'About me',
		name:'paHa345'
	})
})

app.get('/tree',(req, res)=>{
	res.render('tree', {
		title:'Tree',
		name:'paHa345'
	})
})


app.get('/help',(req, res)=>{
	res.render('help', {
		title:'Help page',
		name:'paHa345',
		message:'Help message'
	})
})

app.get('/weather', (req, res)=>{
	
	if (!req.query.address) {
		return res.send({
			error:'You must provide an address!'
		})
	}

	geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
		if (error) {
			console.log(location)
			return res.send({error})
		}
		
		forecast(latitude, longitude, (error, forecastData)=>{
			if (error) {
				return res.send(`Error: ${error}`)
			}
			console.log(location)
			console.log(forecastData)


				res.send({
					forecast:'snow',
					location:location,
					address: req.query.address,
					data: forecastData
				})
		})
	})
})	

app.get('/help/*', (req, res)=>{
	res.render('error',{
		title:'404',
		errorMessage:'Article not found',
		name:'paHa345'
	})

})

app.get('/products', (req, res)=>{

	if (!req.query.search) {
		return res.send({
			error:'You must provide the search term'
		})
	}

	console.log(req.query)
	res.send({
		products:[]
	})
})

app.get('*',(req, res)=>{
	res.render('error',{
		title:'404',
		errorMessage:'404 page',
		name:'paHa345'
	})
})


app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`)
})