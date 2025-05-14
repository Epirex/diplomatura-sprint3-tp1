import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({ 
            edad: { $gt: 30 }, 
            planetaOrigen: "Tierra", 
            $expr: { $gte: [{ $size: "$poderes" }, 2] }
        });
    }

    async crear(datos) {
        const nuevoHeroe = new SuperHero(datos);
        return await nuevoHeroe.save();
    }

    async actualizar(id, datos) {
        return await SuperHero.findByIdAndUpdate(id, datos, { new: true });
    }

    async eliminarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    async eliminarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombre });
    }
}

export default new SuperHeroRepository();

