import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import SuperHeroRoutes from './routes/SuperHeroRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/api', SuperHeroRoutes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
