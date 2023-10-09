'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from './page.module.css';
import { capitalizeFirstLetter } from "@/helpers/helpers";

type Props = {
  params: {
    name: string
  }
}

export const PokemonCard = ({ params } : Props) => {
  const router = useRouter();

  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  // Get pokemon info from api
  const fetchPokemon = async (name : string) => {

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

      if (res.status === 200) {
        const response : any = await res.json();
        setData(response)
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

  useEffect(() => {
    if (params.name) {
      fetchPokemon(params.name);
    }
  }, [])

  return (
    <div className={styles.container}>
      <a className={styles.back} onClick={()=> router.back()}>❮ Atras</a>
      {loading && <p className={styles.message}>Cargando datos...</p>}
      {!loading && error && <p className={styles.message}>Error obteniendo datos...</p>}
      {Object.keys(data).length !== 0 && (
        <div className={styles.card}>
          <Image 
            src={data?.sprites?.other?.home?.front_default ? data?.sprites?.other?.home?.front_default : '/Pokeball_256.png'}
            alt={`Image ${data?.name}`}
            width={200}
            height={200}
            priority
          />
          <div className={styles.title}>
            <h2>{capitalizeFirstLetter(data?.name)}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default PokemonCard;