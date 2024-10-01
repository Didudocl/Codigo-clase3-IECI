import { Router } from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser); // * http://localhost:3000/api/user/ - post
router.get('/all', getUsers); // * http://localhost:3000/api/user/all - get
router.get('/:id', getUser); // * http://localhost:3000/api/user/:id - get
router.put('/:id', updateUser); // * http://localhost:3000/api/user/:id - put
router.delete('/:id', deleteUser); // * http://localhost:3000/api/user/:id - delete

export default router;