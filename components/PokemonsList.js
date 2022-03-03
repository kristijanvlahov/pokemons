import styles from './PokemonList.module.css';
import PokemonItem from './PokemonItem';

const PokemonsList = (props) => {
    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                {props.pokemons.slice(props.minValue,props.maxValue).map((pokemon) => (
                    <PokemonItem
                        name={pokemon.name}
                        key={pokemon.key}
                        image={pokemon.image}
                        url={pokemon.url}
                    />
                ))}
            </div>
        </main>
    );
}

export default PokemonsList;