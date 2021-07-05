import { gql } from "@apollo/client";

export const GET_STARSHIPS = gql`
  query {
    allStarships(first: 10) {
      starships {
        id
        name
        starshipClass
        maxAtmospheringSpeed
        costInCredits
        passengers
        filmConnection {
          totalCount
        }
      }
    }
  }
`;
