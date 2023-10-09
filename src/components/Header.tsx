import Link from "next/link";
import styles from '../styles/header.module.css';


export default function Header() {
  return (
    <div className={styles.header}>
        <h1>
            <Link href="/">
                Pokémon
            </Link>
        </h1>
    </div>
  )
}
