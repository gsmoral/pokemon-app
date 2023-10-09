'use client'
import { GlobalState } from "./";
import { PokemonListResponse } from "@/types/types";

type GlobalActionType = 
  | { type: '[GL] - ToggleView', payload : 'list' | 'grid'}
  | { type: '[GL] - UpdatePokemonList', payload: PokemonListResponse }

export const GlobalReducer = ( state: GlobalState, action: GlobalActionType): GlobalState => {

  switch (action.type) {
    case '[GL] - ToggleView':
      return {
        ...state,
        viewType: action.payload
      }
    case '[GL] - UpdatePokemonList':
      return {
        ...state,
        pokemonList: action.payload,
      }
    default:
      return state;
  }
} ;