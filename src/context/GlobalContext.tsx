'use client'
import { PokemonListResponse } from '@/types/types';
import { createContext } from 'react';

interface ContextProps {
  viewType: 'list' | 'grid';
  pokemonList: PokemonListResponse;

  // Methods
  toggleView: ( view : 'list' | 'grid' ) => void;
  updatePokemonList: ( pokemonList : PokemonListResponse ) => void;
}

export const GlobalContext = createContext({} as ContextProps);