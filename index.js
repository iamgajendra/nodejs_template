require('app-module-path').addPath(__dirname);
require('dotenv').config()

const app = require('./routes/index');
const logger = require('logger')
const http = require('http');
const server = http.createServer(app);

app.get('/', (req, res) => {
  logger.info("Root Api is working...")
  return res.status(200).send("api is live")
})

app.get('/health', (request, response) => response.sendStatus(200));


server.listen(process.env.PORT || 5001, () => { 
  console.log(`App started on port ${process.env.PORT || 5001}`);
});
  