import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Observable, tap } from "rxjs";
import { AppDispatch } from ".";
import Coin from "../models/coin";
import { coinsService } from "../services";

type CoinsState = {
    data: Coin[];
}

const initState: CoinsState = {
    data: []
}

const coinsSlice = createSlice({
    name: 'coins',
    initialState: initState,
    reducers: {
        setCoins: (state, action: PayloadAction<Coin[]>) => {
            state.data = action.payload;
        }
    }
});

const { setCoins } = coinsSlice.actions;

const retrieveCoinsAction = (state: CoinsState, dispatch: AppDispatch, offset: number): Observable<Coin[]> => {
    return coinsService.retrieve({ offset }).pipe(
        tap(data => {
            if (offset === 0) {
                dispatch(setCoins(data));
            } else {
                dispatch(setCoins(state.data.concat(data)));
            }
        })
    );
}

export { coinsSlice, retrieveCoinsAction };