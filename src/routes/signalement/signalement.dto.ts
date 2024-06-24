enum SignalementCategory {
    confidentialite,
    acces,
    assistance,
    securite,
    donnees,
    compte
}

export type Signalement = {
    id: string;
    email: string;
    category: SignalementCategory;
    description: string;
    createdAt: Date;
    solved: boolean;
    solvedAt?: Date;
}

export type FormData = {
    id: string;
    status: string;
    text: string;
}