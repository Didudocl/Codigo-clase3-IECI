"use strict";
import User from '../entity/user.entity.js';
import { AppDataSource } from '../config/configDb.js';

/**
 * Crea un usuario en la base de datos
 */

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

/**
 * Obtiene todos los usuarios de la base de datos
 */
export async function getUsersService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const users = await userRepository.find();
        return users;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}

/**
 * Obtiene un usuario por id en la base de datos
 */
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

/**
 * Actualiza al usuario en la base de datos
 */

export async function updateUserService() {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userToUpdate = await userRepository.findOne({ where: { id } });

        if (!userToUpdate) {
            return null;
        }

        userRepository.merge(userToUpdate, dataUser);

        const updateUser = await userRepository.save(userToUpdate);

        return updateUser;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
    }
}

/**
 * Borra a un usuario de la base de datos
 */
export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userToDelete = await userRepository.findOne({ where: { id } });

        if (!userToDelete) {
            return null;
        }

        await userRepository.remove(userToDelete);

        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
    }
}