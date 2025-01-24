export type JWTPayload = {
    id: string;
    sessionId: string;
};

export type JWTStrategyValidatePayload  = JWTPayload & {
    iat: number;
    exp: number;
};

export type TokenResponse = {
    accessToken: string;
};

export type RegisterPayload = {
    username: string;
    password: string;
    email: string
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type AuthPayload = {
    accessToken: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
};