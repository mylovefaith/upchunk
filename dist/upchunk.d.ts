import { XhrHeaders } from 'xhr';
declare type EventName = 'attempt' | 'attemptFailure' | 'chunkSuccess' | 'error' | 'offline' | 'online' | 'progress' | 'success';
declare type AllowedMethods = 'PUT' | 'POST' | 'PATCH';
export interface UpChunkOptions {
    endpoint: string | ((file?: File) => Promise<string>);
    file: File;
    method?: AllowedMethods;
    headers?: XhrHeaders;
    maxFileSize?: number;
    chunkSize?: number;
    attempts?: number;
    delayBeforeAttempt?: number;
    data?: any;
}
export declare class UpChunk {
    endpoint: string | ((file?: File) => Promise<string>);
    file: File;
    headers: XhrHeaders;
    additionalData: any;
    method: AllowedMethods;
    chunkSize: number;
    attempts: number;
    delayBeforeAttempt: number;
    private chunk;
    private chunkCount;
    private chunkByteSize;
    private maxFileBytes;
    private endpointValue;
    private totalChunks;
    private attemptCount;
    private offline;
    private paused;
    private success;
    private currentXhr?;
    private reader;
    private eventTarget;
    constructor(options: UpChunkOptions);
    /**
     * Subscribe to an event
     */
    on(eventName: EventName, fn: (event: CustomEvent) => void): void;
    abort(): void;
    pause(): void;
    resume(): void;
    /**
     * Dispatch an event
     */
    private dispatch;
    /**
     * Validate options and throw errors if expectations are violated.
     */
    private validateOptions;
    /**
     * Endpoint can either be a URL or a function that returns a promise that resolves to a string.
     */
    private getEndpoint;
    /**
     * Get portion of the file of x bytes corresponding to chunkSize
     */
    private getChunk;
    private xhrPromise;
    /**
     * Send chunk of the file with appropriate headers and add post parameters if it's last chunk
     */
    private sendChunk;
    /**
     * Called on net failure. If retry counter !== 0, retry after delayBeforeAttempt
     */
    private manageRetries;
    /**
     * Manage the whole upload by calling getChunk & sendChunk
     * handle errors & retries and dispatch events
     */
    private sendChunks;
}
export declare const createUpload: (options: UpChunkOptions) => UpChunk;
export {};
