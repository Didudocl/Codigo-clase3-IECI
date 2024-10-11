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
      const users = await User.find()
        .select("-password")
        .populate("roles")
        .exec();
      if (!users) return [null, "No hay usuarios"];
  
      return [users, null];
    } catch (error) {
      handleError(error, "user.service -> getUsers");
    }
  }

  async function updateUserService(id, user) {
    try {
      const userFound = await User.findById(id);
      if (!userFound) return [null, "El usuario no existe"];
  
      const { username, email, rut, password, newPassword, roles } = user;
  
      const matchPassword = await User.comparePassword(
        password,
        userFound.password,
      );
  
      if (!matchPassword) {
        return [null, "La contraseña no coincide"];
      }
  
      const rolesFound = await Role.find({ name: { $in: roles } });
      if (rolesFound.length === 0) return [null, "El rol no existe"];
  
      const myRole = rolesFound.map((role) => role._id);
  
      const userUpdated = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          rut,
          password: await User.encryptPassword(newPassword || password),
          roles: myRole,
        },
        { new: true },
      );
  
      return [userUpdated, null];
    } catch (error) {
      handleError(error, "user.service -> updateUser");
    }
  }

  async function deleteUserService(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      handleError(error, "user.service -> deleteUser");
    }
  }
