import express from 'express';
import { ticketController } from '../controllers/ticket.controller.js';
import authenticate from '../middlewares/authenticate.middleware.js';
import { authorizeAdmin } from '../middlewares/authorizeAdmin.middleware.js';

const router = express.Router();

// Routes for both admin and clients
router.get('/', authenticate, ticketController.getAllTickets);
router.get('/:id', authenticate, ticketController.getTicket);
router.post('/:id/reply', authenticate, ticketController.addReply);

// Routes for clients only
router.post('/', authenticate, ticketController.createTicket);

// Routes for admin only
router.patch('/:id/status', authenticate, authorizeAdmin, ticketController.updateStatus);

export const ticketRouter = router;