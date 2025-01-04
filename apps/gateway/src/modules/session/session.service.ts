import { Injectable } from "@nestjs/common";
import * as uuid from 'uuid'
import { SessionPayload, Session } from "./session.types"; 

@Injectable()
export class SessionService {
    private sessions = new Map<string, Session>();
    private storeDelayS = 1800 // 30 min

    constructor() {}

    async refreshSession(userId: string) {
        return this.create({ userId });
    }

    create(payload: SessionPayload) {
        const sessionId = uuid.v4();
        const item: Session = {
            ...payload,
            sessionId,
            lastUpdatedAt: Date.now(),
        };

        this.sessions.set(payload.userId, item);
        return sessionId;
    }

    delete(userId: string) {
        this.sessions.delete(userId);
    }

    get(userId: string) {
        return this.sessions.get(userId);
    }

    isValid(userId: string) {
        const session = this.get(userId);
        if(!session) {
            return;
        }
        return Date.now() - session.lastUpdatedAt < this.storeDelayS;
    }
}