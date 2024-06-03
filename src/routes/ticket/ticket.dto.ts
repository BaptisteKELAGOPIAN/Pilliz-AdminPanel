enum TicketCategory {
    confidentialite,
    acces,
    assistance,
    securite,
    donnees,
    compte
}

export type Ticket = {
    id: string;
    email: string;
    category: TicketCategory;
    description: string;
    createdAt: Date;
    solved: boolean;
    solvedAt?: Date;
}

export type TicketResponse = {
    id: string;
    ticketId: string;
    response: string;
    createdAt: Date;
}

export type FormData = {
    id: string;
    status: string;
    text: string;
}