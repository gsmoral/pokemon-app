'use client'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context';
import PokemonList from '@/components/PokemonList';
import { PokemonListResponse } from '@/types/types';
import styles from './page.module.css';


export default function Home() {

  // Get and set pokemons data from context
  const { pokemonList, updatePokemonList } = useContext( GlobalContext );

  const [loading, setLoading] = useState(pokemonList?.results.length === 0 ? true : false); 
  const [error, setError] = useState(false); 

  // Get pokemons info from api
  const fetchPokemons = async (path = 'https://pokeapi.co/api/v2/pokemon') => {
    try {
      // setLoading(true)
      const res = await fetch(path);

      if (res.status === 200) {
        const response : PokemonListResponse = await res.json();
        updatePokemonList(response)
        setLoading(false)
      } else {
        setError(true);
        setLoading(false);
      }

    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  // Load pokemons only if empty
  useEffect(() => {
    if (pokemonList?.results.length === 0) {
      fetchPokemons();
    }
  }, [])

  const handlePagination = (path : string) => {
    fetchPokemons(path);
  }

  return (
    <main className={styles.main}>
      {loading && <p className={styles.message}>Cargando datos...</p>}
      {!loading && error && <p className={styles.message}>Error obteniendo datos...</p>}
      {!loading && !error && pokemonList?.results.length === 0 && <p className={styles.message}>No hay datos a mostrar...</p>}
      {!loading && !error && pokemonList?.results.length > 0 && 
        <PokemonList data={pokemonList} onPageChange={handlePagination} />
      }
    </main>
  )
}
