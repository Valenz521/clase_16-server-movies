
require("dotenv").config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const routes = require('./api.routes');

app.use('/api/v1', routes);

app.get('/',(req, res) =>{
    res.send('¡Hola mundo desde NOde. con express');
});

const sequelize =require('./src/models/dbconnection');

require('./src/models/sync_tables');


app.listen(process.env.PORT, async () =>{
    console.log(process.env.BIENVENIDA, process.env.PORT);
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida con exito a la base de datos!!!");

        await sequelize.sync({alter:true});
        console.log('Tablas sincronizadas');

    } catch (error) {
       console.error("Error conectando a la base de datos:",error); 
    }
});