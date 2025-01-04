export type SessionPayload = {
    userId: string;
};

export type Session = {
    sessionId: string;
} & SessionPayload;