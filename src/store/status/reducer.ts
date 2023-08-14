import { StatusActionTypes, StatusState, statusLoad } from "./types";

const initialState: StatusState = {
    status: null
};

export const statusReducer = (state: typeof initialState = initialState, action: StatusActionTypes): StatusState => {

    switch (action.type) {
        case statusLoad:
            return {
                ...state,
                status: [...action.payload]
            };

        default:
            return state;
    }
};