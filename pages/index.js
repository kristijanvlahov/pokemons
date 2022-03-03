import Head from "next/head";
import React, { useState } from "react";
import { gql, useQuery, ApolloClient, InMemoryCache } from "@apollo/client";
import styles from "../styles/Home.module.css";
import PokemonsList from "../components/PokemonsList";
import { Pagination } from "antd";
import { client } from "../apollo-client";
import { POKEMON_DETAILS } from "../query/PokemonDetails";
import Layout from "../components/layout/Layout";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 200,
  offset: 1,
};

export default function Home(props) {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(20);

  function handlePageClick(value) {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(20);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 20);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon API App</title>
        <meta name="description" content="Side project during work" />
      </Head>
      <main className={styles.main}>
        <PokemonsList
          pokemons={props.pokemons}
          minValue={minValue}
          maxValue={maxValue}
        />
        <Pagination
          defaultCurrent={1}
          defaultPageSize={5}
          total={50}
          onChange={handlePageClick}
          style={{ margin: "2rem" }}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POKEMONS,
    variables: gqlVariables,
  });

  console.log("Response from server", data);

  const pokemoni = data.pokemons;
  return {
    props: {
      pokemons: pokemoni.results.map((pokemon) => ({
        name: pokemon.name,
        key: pokemon.name,
        image: pokemon.image,
        url: pokemon.url,
      })),
    },
  };
}
