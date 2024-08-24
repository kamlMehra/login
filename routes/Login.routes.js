import express from  'express'

import { login, signup } from '../controllers/Register.controllers.js';

const routes = express.Router();

routes.post('/register',signup);

routes.post('/login',login);

// routes.get('/fetch',fetch);

export default routes;