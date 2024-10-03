"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

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
    }
}

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
    }
}

export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();

        return users; // Devuelve la lista de usuarios
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

export async function updateUserService(id, dataUser) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null; // Si no se encuentra el usuario
        }

        // Actualizar los campos del usuario
        userFound.nombreCompleto = dataUser.nombreCompleto;
        userFound.rut = dataUser.rut;
        userFound.email = dataUser.email;

        const updatedUser = await userRepository.save(userFound); // Guardar los cambios

        return updatedUser; // Retornar el usuario actualizado
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({
            where: { id }
        });

        if (!userFound) {
            return null; // Si no se encuentra el usuario
        }

        await userRepository.remove(userFound); // Eliminar el usuario

        return userFound; // Retornar el usuario eliminado
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
}
