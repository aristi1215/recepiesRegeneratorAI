import express from 'express';
import { RecepiesController } from '../controllers/recepies';


export const recepiesRouter = express.Router()

recepiesRouter.get('/', RecepiesController.getAll)
recepiesRouter.post('/', RecepiesController.saveRecepie)



