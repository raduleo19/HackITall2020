import {
    SET_LANGUAGE
} from '../_actions/types';

const initialState = {
    language: localStorage.getItem('language'), foo: 'bar',
};

export default function languageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            let x = { ...state, language: action.payload };
            // console.log("dadaada", action.payload)
            return x;
        default:
            return state;
    }
}