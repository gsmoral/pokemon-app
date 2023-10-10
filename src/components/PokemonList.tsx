'use client'
import React, { useContext } from 'react';
import Image from 'next/image'
import { GlobalContext } from '@/context';
import { PokemonListResponse } from '@/types/types';
import PokemonCard from './PokemonCard';
import styles from '@/styles/pokemonlist.module.css'
import Pagination from './Pagination';

type Props = {
  data: PokemonListResponse;
  onPageChange: (path : string) => void;
}

const PokemonList = ({ data, onPageChange } : Props) => {

  // Get and set the view type from context
  const { viewType, toggleView } = useContext( GlobalContext );

  const { count , page, next, previous, results : pokemons } = data;

  const handlePageChange = (newPage: string) => {
    onPageChange(newPage);
  };

  // Calculate offset from page number and create url
  const handlePageNumber = (page : number | string) => {
    const offset = Number.isInteger(page) ? (Number(page) - 1) * 20: 0;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`;
    onPageChange(url);
  }

  return (
    <div className={styles.pokemon__list}>
      <div className={styles.pokemon__list_buttons}>
        <a onClick={() => toggleView('list')}>
          <Image
            className={styles.icon}
            style={{backgroundColor: viewType === 'list' ? '#d6d6d6' : ''}}
            src="/list.svg"
            alt="List view"
            width={30}
            height={30}
            priority
          />
        </a>
        <a onClick={() => toggleView('grid')}>
          <Image
            className={styles.icon}
            // style={{opacity: 0.5}}
            style={{backgroundColor: viewType === 'grid' ? '#d6d6d6' : ''}}
            src="/grid.svg"
            alt="Grid view"
            width={30}
            height={30}
            priority
          />
        </a>
      </div>
    <div className={styles[viewType]}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
    <div className={styles.pokemon__list_pagination}>
      {/* <button className={styles.pagination_button} onClick={() => handlePageChange(previous ? previous : '')} disabled={previous == null}>
        ❮
      </button>
      <button className={styles.pagination_button} onClick={() => handlePageChange(next)}>❯</button> */}
      <Pagination
        currentPage={page}
        totalCount={count}
        pageSize={20}
        onPageChange={handlePageNumber}
      />
    </div>
  </div>
  );
};

export default PokemonList;