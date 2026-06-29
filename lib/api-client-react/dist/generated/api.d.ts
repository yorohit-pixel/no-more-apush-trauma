import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AssistantInfo, HealthStatus, MessageInput, Thread, TriviaQuestion, UploadedFile } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetAssistantUrl: () => string;
/**
 * Returns assistant name, welcome message, and period info
 * @summary Get assistant info
 */
export declare const getAssistant: (options?: RequestInit) => Promise<AssistantInfo>;
export declare const getGetAssistantQueryKey: () => readonly ["/api/chat/assistant"];
export declare const getGetAssistantQueryOptions: <TData = Awaited<ReturnType<typeof getAssistant>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAssistant>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAssistant>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAssistantQueryResult = NonNullable<Awaited<ReturnType<typeof getAssistant>>>;
export type GetAssistantQueryError = ErrorType<unknown>;
/**
 * @summary Get assistant info
 */
export declare function useGetAssistant<TData = Awaited<ReturnType<typeof getAssistant>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAssistant>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateThreadUrl: () => string;
/**
 * @summary Create a new conversation thread
 */
export declare const createThread: (options?: RequestInit) => Promise<Thread>;
export declare const getCreateThreadMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createThread>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createThread>>, TError, void, TContext>;
export type CreateThreadMutationResult = NonNullable<Awaited<ReturnType<typeof createThread>>>;
export type CreateThreadMutationError = ErrorType<unknown>;
/**
* @summary Create a new conversation thread
*/
export declare const useCreateThread: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createThread>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createThread>>, TError, void, TContext>;
export declare const getSendMessageUrl: (threadId: string) => string;
/**
 * @summary Send a message and stream the assistant response
 */
export declare const sendMessage: (threadId: string, messageInput: MessageInput, options?: RequestInit) => Promise<string>;
export declare const getSendMessageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendMessage>>, TError, {
        threadId: string;
        data: BodyType<MessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof sendMessage>>, TError, {
    threadId: string;
    data: BodyType<MessageInput>;
}, TContext>;
export type SendMessageMutationResult = NonNullable<Awaited<ReturnType<typeof sendMessage>>>;
export type SendMessageMutationBody = BodyType<MessageInput>;
export type SendMessageMutationError = ErrorType<unknown>;
/**
* @summary Send a message and stream the assistant response
*/
export declare const useSendMessage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendMessage>>, TError, {
        threadId: string;
        data: BodyType<MessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof sendMessage>>, TError, {
    threadId: string;
    data: BodyType<MessageInput>;
}, TContext>;
export declare const getUploadFileUrl: (threadId: string) => string;
/**
 * @summary Upload a file to attach to this conversation
 */
export declare const uploadFile: (threadId: string, options?: RequestInit) => Promise<UploadedFile>;
export declare const getUploadFileMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError, {
        threadId: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError, {
    threadId: string;
}, TContext>;
export type UploadFileMutationResult = NonNullable<Awaited<ReturnType<typeof uploadFile>>>;
export type UploadFileMutationError = ErrorType<unknown>;
/**
* @summary Upload a file to attach to this conversation
*/
export declare const useUploadFile: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof uploadFile>>, TError, {
        threadId: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof uploadFile>>, TError, {
    threadId: string;
}, TContext>;
export declare const getGetTriviaUrl: () => string;
/**
 * @summary Get a random APUSH trivia question
 */
export declare const getTrivia: (options?: RequestInit) => Promise<TriviaQuestion>;
export declare const getGetTriviaQueryKey: () => readonly ["/api/chat/trivia"];
export declare const getGetTriviaQueryOptions: <TData = Awaited<ReturnType<typeof getTrivia>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrivia>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTrivia>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTriviaQueryResult = NonNullable<Awaited<ReturnType<typeof getTrivia>>>;
export type GetTriviaQueryError = ErrorType<unknown>;
/**
 * @summary Get a random APUSH trivia question
 */
export declare function useGetTrivia<TData = Awaited<ReturnType<typeof getTrivia>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTrivia>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map