export const statusV2Load = '[statusV2] Load';
export const statusV2Update = '[statusV2] update';

export type StatusV2 = {
    id: string;
    day: string;
    enabledAM: boolean;
    enabledPM: boolean;
    updatedAtAM: string;
    updatedAtPM: string;

};

export type StatusV2State = {
    statusV2: null | StatusV2[];
};

type StatusV2LoadAction = {    
    type: typeof statusV2Load,
    payload: StatusV2[]
};


export type StatusV2ActionTypes = 
StatusV2LoadAction;