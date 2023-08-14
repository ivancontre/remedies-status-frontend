export const statusLoad = '[status] Load';
export const statusUpdate = '[status] update';

export type Status = {
    id: string;
    day: string;
    morning: string;
    afternoon: string;
    updatedat_morning: string;
    updatedat_afternoon: string;

};

export type StatusState = {
    status: null | Status[];
};

type StatusLoadAction = {    
    type: typeof statusLoad,
    payload: Status[]
};


export type StatusActionTypes = 
StatusLoadAction;