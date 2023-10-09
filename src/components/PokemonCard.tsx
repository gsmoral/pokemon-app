import Link from "next/link";
import { PokemonItem } from "@/types/types";
import { capitalizeFirstLetter } from "@/helpers/helpers";
import styles from '@/styles/pokemoncard.module.css'

type Props = {
  pokemon: PokemonItem;
}

const PokemonCard = ({ pokemon } : Props) => {

  return (
    <div className={styles.cardContainer}>
      <Link href={`pokemon/${pokemon.name}`} >
        <div className={styles.card}>
            <p className={styles.title}>{capitalizeFirstLetter(pokemon.name)}</p>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;