import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      id
      email
      isSelf
    }
  }
`;
