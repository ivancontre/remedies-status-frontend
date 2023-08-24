import { Dispatch } from "react";
import { message } from "antd";
import { AuthActionTypes, User, authLogin, authLogout } from "./types";
import { runFetch } from "../../helpers/fetch";

export const startLogin = (email: string, password: string, setloading: Function) => {
    return async (dispatch: Dispatch<AuthActionTypes> | any) => {
        setloading(true);

        try {
            const resp = await runFetch('api/auth/login', { email, password }, 'POST');

            const respJson = await resp.json();

            if (resp.status === 200) {
                localStorage.setItem('token', respJson.token);
                localStorage.setItem('token-init-date', new Date().getTime().toString());
                setloading(false);

                console.log(respJson)

                dispatch(login({
                    id: respJson.user.id,
                    name: respJson.user.name,
                    email: respJson.user.email
                }));

            } else  {
                if (respJson.errors) {

                    for (let [, value] of Object.entries(respJson.errors)) {
                        message.warn((value as any).msg);
                        console.log((value as any).msg);
                    }

                } else {
                    message.warn(respJson.msg, 5);
                    console.log(respJson.msg);
                }

                setloading(false);
            }
        } catch (error) {
            message.error('Error interno, consulte con el administrador')
            console.log(error);
            setloading(false);
        }

    }
};

export const startLogout = () => {
    return (dispatch: Dispatch<AuthActionTypes>) => {
        localStorage.removeItem('token');
        dispatch(logout());
    }
};

export const startChecking = () => {
    return async (dispatch: Dispatch<any>) => {

        try {
            const token = localStorage.getItem('token') || 'token';

            if (!token) {
                dispatch(logout());
            }

            const resp = await runFetch('api/auth/renew-token',  {}, 'GET', token);
            const respJson = await resp.json();

            if (resp.status === 200) {
                localStorage.setItem('token', respJson.token);

                dispatch(login({
                    id: respJson.user.id,
                    name: respJson.user.name,
                    email: respJson.user.email
                }));

            } else {
                
                dispatch(logout());
            }

        } catch (error) {
            console.log(error);
        }        

    }   
};

const login = (user: User): AuthActionTypes => {
    return {
        type: authLogin,
        payload: user
    }
};

const logout = (): AuthActionTypes => {
    return {
        type: authLogout
    }
};