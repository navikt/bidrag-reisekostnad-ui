import useSWR from 'swr';
import { ISessionData } from '../pages/api/auth/session';

export interface IUseSession {
    session: ISessionData | undefined;
    isLoading: boolean;
    isError: boolean;
}

export function useSession(): IUseSession {
    const { data, error } = useSWR<ISessionData>('/api/auth/session');

    return {
        session: data,
        isLoading: !error && !data,
        isError: error,
    };
}
