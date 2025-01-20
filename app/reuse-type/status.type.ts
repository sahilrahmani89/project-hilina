export interface StatusObject  {
    load: 'loading';
    authenticated: 'authenticated';
    unauthenticated: 'unauthenticated';
};
export type Status= 'loading'|'authenticated'|'unauthenticated'
    