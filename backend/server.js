const express = require('express');
const cors = require('cors');
const ConsultaRoutes = require('./routes/ConsultaRoutes.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/consulta', ConsultaRoutes);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});