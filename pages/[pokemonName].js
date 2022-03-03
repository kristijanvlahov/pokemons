import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import { POKEMON_DETAILS } from "../query/PokemonDetails";
import Head from "next/head";
import styles from "../styles/PokemonDetails.module.css";
import { client } from "../apollo-client";
import Layout from "../components/layout/Layout";
import { Progress, Tag } from "antd";

const PokemonDetails = (props) => {
  console.log(props);
  return (
    <div>
      <Head>
        <title>Pokemon Details</title>
      </Head>
      <h1>{props.pokemon.name}</h1>
      <img src={props.pokemon.front_image} width="300px" />
      <img src={props.pokemon.back_image} width="300px" />
      <div className={styles.title}>Stats:</div>{" "}
      {props.pokemon.base_stats.map((stat) => (
        <div className={styles.text}>
          {stat.stat.name}
          <Progress percent={stat.base_stat} showInfo={false} />
        </div>
      ))}
      <div className={styles.title}>Type:</div>
      <div className={styles.text}>
        {" "}
        {props.pokemon.type.map((type) => (
          <div>{type.type.name}</div>
        ))}
      </div>
      <div className={styles.title}>Height:</div>
      <div className={styles.text}> {props.pokemon.height}cm</div>
      <div className={styles.title}>Weight:</div>
      <div className={styles.text}> {props.pokemon.weight}g</div>
      <div className={styles.title}>Abilities:</div>
      <div className={styles.text}>
        {props.pokemon.ability.map((ability) => (
          <div>{ability.ability.name}</div>
        ))}
      </div>
      <div className={styles.title}>Moves:</div>{" "}
      <div className={styles.text}>
        {props.pokemon.move.map((move) => (
          <Tag color="orange">{move.move.name}</Tag>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const pokemonName = context.params.pokemonName;

  const gqlVariables = {
    name: pokemonName,
  };

  const { data } = await client.query({
    query: POKEMON_DETAILS,
    variables: gqlVariables,
  });

  const pokemon = data.pokemon;
  return {
    props: {
      pokemon: {
        name: pokemon.name,
        id: pokemon.id,
        height: pokemon.height,
        weight: pokemon.weight,
        ability: pokemon.abilities,
        move: pokemon.moves,
        type: pokemon.types,
        front_image: pokemon.sprites.front_default,
        back_image: pokemon.sprites.back_default,
        base_stats: pokemon.stats,
      },
    },
  };
}

export default PokemonDetails;
