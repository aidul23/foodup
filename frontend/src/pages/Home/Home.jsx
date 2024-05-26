import React, { useEffect, useReducer } from 'react'
import { getAllFood } from '../../services/foodService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';

const initialState = {foods: []};

const reducer = (state,action) => {
    switch (action.type) {
        case 'FOODS_LOADED':
            return {...state, foods: action.payload}
        default:
            return state;
    }
}

export default function Home() {
    const [state, dispatch] = useReducer(reducer,initialState);
    const {foods} = state;

    useEffect(() => {
        getAllFood().then(foods => dispatch({type: 'FOODS_LOADED', payload: foods}));
    },[]);
  return (
    <>
        <Thumbnails foods={foods}/>
    </>
  )
}
