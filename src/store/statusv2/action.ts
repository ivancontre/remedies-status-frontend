import { Dispatch } from "react";
import { StatusV2, StatusV2ActionTypes, statusV2Load } from "./types";
import { runFetch } from "../../helpers/fetch";
import { message } from "antd";

export const startLoadStatusV2 = () => {
    return async (dispatch: Dispatch<StatusV2ActionTypes>) => {

        try {
            const token = localStorage.getItem('token') as string;
            const resp = await runFetch('api/v2/status', {}, 'GET', token);
            const respJson = await resp.json();

            if (resp.status === 200) {
                dispatch(loadStatusV2(respJson));
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

export const startUpdateStatusV2 = (id: string, action: string, day: string, key: string, value: boolean, showLoading: Function, hideLoading: Function) => {
    return async (dispatch: Dispatch<StatusV2ActionTypes>) => {

        showLoading();

        try {
            const token = localStorage.getItem('token') as string;
            const resp = await runFetch('api/v2/status/' + id , {action, day, key, value}, 'PUT', token);
            const respJson = await resp.json();

            if (resp.status === 200) {
                dispatch(loadStatusV2(respJson));
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

const loadStatusV2 = (status: StatusV2[]): StatusV2ActionTypes => {
    return {
        type: statusV2Load,
        payload: status
    }
};
