import { ApiError, asyncHandler } from '../utils/index.js';
import { Ticket } from '../models/ticket.model.js';

class TicketController {
    // Create ticket (Only for users/clients)
    createTicket = asyncHandler(async (req, res) => {
        const { title, description } = req.body;
        
        if (!title || !description) {
            return res
                .status(400)
                .json(new ApiError(400, false, "Title and description are required"));
        }

        if (req.user.role === 'admin') {
            return res
                .status(403)
                .json(new ApiError(403, false, "Admins cannot create tickets"));
        }
        
        const ticket = await Ticket.create({
            title,
            description,
            issuedBy: req.user._id
        });

        await ticket.populate('issuedBy', 'name email');
        
        return res.status(201).json({
            success: true,
            ticket
        });
    });

    // Get all tickets
    getAllTickets = asyncHandler(async (req, res) => {
        if (req.user.role === 'admin') {
            // Admins can see all tickets
            const tickets = await Ticket.find()
                .populate('issuedBy', 'name email')
                .populate('replies.repliedBy', 'name email')
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                tickets
            });
        } else {
            // Users can only see their tickets
            const tickets = await Ticket.find({ issuedBy: req.user._id })
                .populate('issuedBy', 'name email')
                .populate('replies.repliedBy', 'name email')
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                tickets
            });
        }
    });

    // Get single ticket
    getTicket = asyncHandler(async (req, res) => {
        const ticket = await Ticket.findById(req.params.id)
            .populate('issuedBy', 'name email')
            .populate('replies.repliedBy', 'name email');

        if (!ticket) {
            return res
                .status(404)
                .json(new ApiError(404, false, "Ticket not found"));
        }

        // Only admin or ticket owner can view the ticket
        if (req.user.role !== 'admin' && ticket.issuedBy._id.toString() !== req.user._id.toString()) {
            return res
                .status(403)
                .json(new ApiError(403, false, "You do not have permission to access this ticket"));
        }

        return res.status(200).json({
            success: true,
            ticket
        });
    });

    // Add reply to ticket
    addReply = asyncHandler(async (req, res) => {
        const { message } = req.body;
        
        if (!message) {
            return res
                .status(400)
                .json(new ApiError(400, false, "Reply message is required"));
        }

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res
                .status(404)
                .json(new ApiError(404, false, "Ticket not found"));
        }

        // Check if user is admin or ticket owner
        const isTicketOwner = ticket.issuedBy.toString() === req.user._id.toString();
        const isAdmin = req.user.role === 'admin';

        if (!isAdmin && !isTicketOwner) {
            return res
                .status(403)
                .json(new ApiError(403, false, "You do not have permission to reply to this ticket"));
        }

        // Check if the reply is valid based on the last reply
        const lastReply = ticket.replies[ticket.replies.length - 1];
        if (lastReply) {
            if (isAdmin && lastReply.replierRole === 'admin') {
                return res
                    .status(400)
                    .json(new ApiError(400, false, "Waiting for client response"));
            }
            if (!isAdmin && lastReply.replierRole === 'client') {
                return res
                    .status(400)
                    .json(new ApiError(400, false, "Waiting for admin response"));
            }
        }

        const reply = {
            repliedBy: req.user._id,
            replierRole: req.user.role,
            message
        };

        ticket.replies.push(reply);
        await ticket.save();
        await ticket.populate('replies.repliedBy', 'name email');

        return res.status(200).json({
            success: true,
            ticket
        });
    });

    // Update ticket status (admin only)
    updateStatus = asyncHandler(async (req, res) => {
        const { status } = req.body;
        
        if (!status || !['open', 'closed', 'resolved'].includes(status)) {
            return res
                .status(400)
                .json(new ApiError(400, false, "Invalid status value"));
        }
        
        const ticket = await Ticket.findById(req.params.id);
        
        if (!ticket) {
            return res
                .status(404)
                .json(new ApiError(404, false, "Ticket not found"));
        }

        ticket.status = status;
        await ticket.save();
        await ticket.populate('issuedBy', 'name email');
        await ticket.populate('replies.repliedBy', 'name email');

        return res.status(200).json({
            success: true,
            ticket
        });
    });
}

export const ticketController = new TicketController();