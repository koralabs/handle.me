import { JwtPayload } from "jsonwebtoken";

export enum Status {
    REFUNDABLE = "refundable",
    PAID = "paid",
    PENDING = "pending",
    DLQ = "dlq",
}

export enum WorkflowStatus {
    PENDING = "pending",
    PROCESSING = "processing",
    SUBMITTED = "submitted",
    CONFIRMED = "confirmed",
    EXPIRED = "expired",
}

export interface HandleResponseBody {
    available: boolean;
    message: string;
    twitter: boolean;
    ogNumber?: number;
    cost?: number;
    link?: string;
    reason?: string;
    mintingQueueSize?: number;
    mintingQueuePosition?: number;
    mintingQueueMinutes?: number;
    tooMany?: boolean;
    sessions?: {
        cost: number;
        emailAddress: string;
        handle: string;
        paymentAddress: string;
    }[];
    tokens?: {
        token: string;
        data: JwtPayload
    }[];
}

export interface StateData {
    chainLoad?: number | null;
    totalHandles?: number;
    spoPageEnabled?: boolean;
    accessWindowTimeoutMinutes?: number;
    paymentWindowTimeoutMinutes?: number;
    accessQueueSize: number;
    dynamicPricingEnabled: boolean;
    mintingPageEnabled: boolean;
    handlePrices: {
        basic: number;
        common: number;
        rare: number;
        ultraRare: number;
    }
}

export interface StateResponseBody extends StateData {
    error: boolean;
    message?: string;
}

export interface SessionResponseBody {
    error: boolean;
    message?: string;
    address: string;
    token: string;
    data: JwtPayload;
    allSessionsToken?: string;
    allSessionsData?: JwtPayload;
}

export interface VerifyResponseBody {
    error: boolean;
    token?: string;
    data?: JwtPayload;
    verified?: boolean;
    message?: string;
    tokens?: {
        token: string;
        data: JwtPayload
    }[],
    activeSessions: {
        cost: number;
        handle: string;
        paymentAddress: string;
        emailAddress: string;
    }[]
}

interface AppendAccessResponse {
    updated?: boolean;
    alreadyExists?: boolean;
    accessQueueSize?: number;
    accessQueuePosition?: {
        position: number;
        minutes: number;
    },
}

export interface QueueResponseBody extends AppendAccessResponse {
    error: boolean;
    message?: string;
    bot?: boolean;
}
