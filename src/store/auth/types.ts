
export const authLogin = '[auth] Login';
export const authStartRegister = '[auth] Start Register';
export const authLogout = '[auth] Logout';
export const authCheckingFinish = '[auth] Finish checking login state';

export type User = {
    id: string;
    name: string;
    email: string;
};

export type AuthState = Partial<User> & {
    checking: boolean;
    logged: boolean;
};

type AuthLogin = {    
    type: typeof authLogin,
    payload: User
};

type AuthLogout = {    
    type: typeof authLogout
};

type AuthCheckingFinish = {    
    type: typeof authCheckingFinish
};

export type AuthActionTypes = AuthLogin | AuthCheckingFinish | AuthLogout;
