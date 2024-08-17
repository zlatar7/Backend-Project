import { ticketService } from "../services/mongoDB/ticket.service.js" ;

class TicketController {

  async create(req, res) {
    try {
      const data = req.body
      const ticket = await ticketService.create(data)
      return res.status(200).json({
        message: "Compra finalizada",
        ticket
      })
    } catch (error) {
      res.status(500).json({
        error: "Error al finalizar la compra",
        details: error.message
      })
    }
  }
}

export const ticketController = new TicketController();