import { gql } from "apollo-boost";

export const LOG_IN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $password: String!
    $userName: String!
    $phoneNum: String!
    $birthday: String!
    $introduce: String
    $classes: Int
  ) {
    createUser(
      email: $email
      password: $password
      userName: $userName
      phoneNum: $phoneNum
      birthday: $birthday
      introduce: $introduce
      classes: $classes
    )
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
