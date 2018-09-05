const app = require('./express.js')
const mongoose = require('mongoose')

const config = require("../config/config")

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})

// Start the API server
app.listen(config.port, (err) => {
	if (err) {
		console.log(err)
	}
  console.log('🌎  ==> API Server now listening on PORT ', config.port)
})