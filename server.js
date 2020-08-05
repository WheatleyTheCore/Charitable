const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate().then(() => {  //make sure the the database is correctly connected
    console.log('authenticated');
}).catch((err) => {
    console.log(err)
})

const User = sequelize.define("user", {
    name: DataTypes.STRING,
    email: DataTypes.STRING
});

(async () => {
    await sequelize.sync({ force: true });
})();

const app = express();
app.use(bodyParser.json());
const port = 3000;


app.get('/', async (req, res) => {
    const users = await User.findAll();
    console.log(users)
    res.send(users);
})

app.post('/create', async (req, res) => {
    const { name, email } = req.body;
    console.log(name, email);

    const newUser = User.create({ name: name, email: email });

    res.send("Got it!");
})


app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`)
})