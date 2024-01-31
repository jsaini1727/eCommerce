const express = require('express');
const routes = require('./routes');
const api_routes = require('./routes/api_routes');
// import sequelize connection


const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./db/connection.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use('/api', api_routes);

// sync sequelize models to the database, then turn on the server
db.sync().then(() =>{
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})
