"use strict";
import { Router } from "express";
import {
    createUser,
    getUser,
    getUsers
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser); // * http://localhost:3000/api/user/ - post
router.get('/all', getUsers); // * http://localhost:3000/api/user/all - get
router.get('/:id', getUser); // * http://localhost:3000/api/user/:id - get

export default router;