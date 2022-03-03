import { gql } from "@apollo/client";

export const POKEMON_DETAILS = gql`
query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      sprites {
        front_default
        back_default
      }
      stats {
        base_stat,
        stat {
          name
        }
      }
      message
      status
    }
  }
  
`;

