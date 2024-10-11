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
        return users;
    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
    }
}

export async function deleteUserService(id) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) return null;

        await userRepository.remove(userFound);
        return userFound;
    } catch (error) {
        console.error("Error al eliminar usuario: ", error);
    }
}

export async function updateUserService(id, userData) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const userFound = await userRepository.findOne({ where: { id } });

        if (!userFound) return null;

        await userRepository.update(id, userData);

        const updatedUser = await userRepository.findOne({ where: { id } });
        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar usuario: ", error);
    }
}
