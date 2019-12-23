require('express-group-routes');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('This is nulisKuy!');
})

app.group('/api/v1', (router) => {

})

app.listen(port, () => console.log(`Listening on port ${port}!`));