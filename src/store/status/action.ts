import { Dispatch } from "react";
import { Status, StatusActionTypes, statusLoad } from "./types";
import { runFetch } from "../../helpers/fetch";
import { message } from "antd";

export const startLoadStatus = () => {
    return async (dispatch: Dispatch<StatusActionTypes>) => {

        try {
            const token = localStorage.getItem('token') as string;
            const resp = await runFetch('api/status', {}, 'GET', token);
            const respJson = await resp.json();

            if (resp.status === 200) {
                dispatch(loadStatus(respJson));
            } else {
                message.warn(respJson.msg, 7);
                console.log(respJson.msg);  
            }

        } catch (error) {
            console.log(error);
            message.error('Error al obtener mazos!');
        }
    }
};

export const startUpdateStatus = (id: string, field: string, status: string, showLoading: Function, hideLoading: Function, sendMessage: Function, idEsp32: string) => {
    return async (dispatch: Dispatch<StatusActionTypes>) => {

        showLoading();

        try {
            const token = localStorage.getItem('token') as string;
            const resp = await runFetch('api/status/' + id , {field, status}, 'PUT', token);
            const respJson = await resp.json();

            if (resp.status === 200) {
                dispatch(loadStatus(respJson));
                sendMessage('CALL_API='+idEsp32)
            } else {
                message.warn(respJson.msg, 7);
                console.log(respJson.msg);  
            }

            hideLoading();

        } catch (error) {
            console.log(error);
            message.error('Error al obtener mazos!');
            hideLoading()
            
        }
    }
};

const loadStatus = (status: Status[]): StatusActionTypes => {
    return {
        type: statusLoad,
        payload: status
    }
};
