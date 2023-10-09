'use client'
import { useReducer } from 'react';
import { GlobalContext, GlobalReducer } from './';
import { PokemonListResponse } from '@/types/types';

export interface GlobalState {
  viewType: 'list' | 'grid';
  pokemonList: PokemonListResponse;
}

const UI_INITIAL_STATE: GlobalState = {
  viewType: 'list',
  pokemonList: {
    count: 0,
    next: '',
    results: []
  }
}

export const GlobalProvider = ({children} : {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer( GlobalReducer, UI_INITIAL_STATE);

  // Methods
  const toggleView = ( view : 'list' | 'grid' ) => {
    dispatch({ type: '[GL] - ToggleView', payload: view})
  }

  const updatePokemonList = ( pokemonList : PokemonListResponse) => {
    dispatch({ type: '[GL] - UpdatePokemonList', payload: pokemonList})
  }
  
  return (
    <GlobalContext.Provider value={{
      ...state,

      // Methods
      toggleView,
      updatePokemonList,
    }}>
      {children}
    </GlobalContext.Provider>

  )
};