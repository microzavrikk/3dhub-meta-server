export type SessionPayload = {
  userId: string;
};

export type Session = {
  sessionId: string;
  lastUpdatedAt: number;
} & SessionPayload;
