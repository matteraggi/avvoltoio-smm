
export interface NotificationType {
    username: string,
    reaction: string,
    dest_id: string,
    timestamp: number,
    type: string,
    isRead: boolean,
}

export type Notification = Omit<NotificationType, 'id'> & { id: null };
