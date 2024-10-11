import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null;
        }

        const deletedUser = await userRepository.remove(userFound);

        return deletedUser;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}
