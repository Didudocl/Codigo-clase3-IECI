import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        if (!users || users.length === 0) {
            return null;
        }

        return users;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}
