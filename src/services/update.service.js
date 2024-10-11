import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function updateUserService(id, user) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        await userRepository.update(id, user);

        const userData = await userRepository.findOne({
            where: { id }
        });

        return userData;
    } catch (error) {
        console.error("Error al actualizar un usuario: ", error);
        throw error;
    }
}
