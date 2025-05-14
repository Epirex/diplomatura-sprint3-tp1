import mongoose from 'mongoose';

export async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://estebanguzzo:01149895953@sprint3tp1.8arhinc.mongodb.net/');
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
}
