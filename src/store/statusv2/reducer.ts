import { StatusV2ActionTypes, StatusV2State, statusV2Load } from "./types";

const initialState: StatusV2State = {
    statusV2: null
};

export const statusV2Reducer = (state: typeof initialState = initialState, action: StatusV2ActionTypes): StatusV2State => {

    switch (action.type) {
        case statusV2Load:
            return {
                ...state,
                statusV2: [...action.payload]
            };

        default:
            return state;
    }
};