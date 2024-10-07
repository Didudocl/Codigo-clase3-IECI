"use strict"; 
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

// Servicio para crear un nuevo usuario
export async function createUserService(dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create({
            nombreCompleto: dataUser.nombreCompleto,
            rut: dataUser.rut,
            email: dataUser.email
        });

        const userSaved = await userRepository.save(newUser);

        return userSaved;
    } catch (error) {
        console.error('Error al crear un usuario: ', error);
        throw new Error('Error al crear el usuario');
    }
}

// Servicio para obtener un usuario por ID
export async function getUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null;
        }

        return userFound;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw new Error('Error al obtener el usuario');
    }
}

// Servicio para obtener todos los usuarios
export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();

        if (!users || users.length === 0) {
            return null;
        }

        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw new Error('Error al obtener los usuarios');
    }
}

// Servicio para actualizar un usuario por ID
export async function updateUserService(id, userData) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Buscar el usuario por ID
        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null; // Usuario no encontrado
        }

        // Actualizar el usuario
        await userRepository.update(id, userData);

        // Retornar el usuario actualizado
        const updatedUser = await userRepository.findOne({ where: { id } });
        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        throw new Error('Error al actualizar el usuario');
    }
}

// Servicio para eliminar un usuario por ID
export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        // Buscar el usuario por ID
        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) {
            return null; // Usuario no encontrado
        }

        // Eliminar el usuario
        const deletedUser = await userRepository.remove(userFound);
        return deletedUser;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw new Error('Error al eliminar el usuario');
    }
}
