import { ticketModel } from "../../models/ticket.model.js";

class TicketService {
  async create(data) {
    try {
      const ticket = await ticketModel.create(data);
      return ticket
    } catch (error) {
      throw error
    }
  }
}
export const ticketService = new TicketService();