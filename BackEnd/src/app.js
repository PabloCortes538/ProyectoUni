import express from "express";
import config from './config';
import usuariosRoutes from './routes/usuarios.routes'
import estudianteRoutes from './routes/estudiante.routes'
import semestreRoutes from './routes/semestres.routes'
import decanoRoutes from './routes/decano.routes'
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
app.use(cors())
//Configuracion
app.set('port', config.port);

//middlewares
app.use(express.json({ type :"*/*"}));
app.use(express.urlencoded({ extended: false }));

app.use(estudianteRoutes)
app.use(usuariosRoutes)
app.use(semestreRoutes)
app.use(decanoRoutes)

export default app