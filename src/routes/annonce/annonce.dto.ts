enum AnnouncementCategory {
    alerte,
    bonPlan,
    info
}

export type Announcement = {
    id: string;
    category: AnnouncementCategory;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
