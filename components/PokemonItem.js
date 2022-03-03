import Link from 'next/link';
import { Card } from 'antd';
import { gql } from '@apollo/client';

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
  limit: 100,
  offset: 1,
};

const PokemonItem = (props) => {
    return (
        <Card title={props.name} extra={<Link href={`${props.name}`}>Read More</Link>} style={{ width: 300, margin: "10px" }}>
            <img src={props.image} width="200px" />
        </Card>

    );
}

export default PokemonItem;