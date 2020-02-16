import { gql } from "apollo-boost";

export const SEE_POST = gql`
  query seePost($id: String!) {
    seePost(id: $id) {
      id
      files {
        id
        url
      }
      author {
        id
        avatar
        userName
        classes
        email
      }
      classifyNum
      main
      announcement
      title
      caption
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $classifyNum: Int!
    $main: Boolean!
    $announcement: Boolean!
    $title: String!
    $caption: String!
    $action: ACTIONS!
  ) {
    editPost(
      id: $id
      classifyNum: $classifyNum
      main: $main
      announcement: $announcement
      title: $title
      caption: $caption
      action: $action
    ) {
      id
    }
  }
`;

export const WRITE_POST = gql`
  mutation upload(
    $classifyNum: Int!
    $main: Boolean!
    $announcement: Boolean!
    $title: String!
    $caption: String!
  ) {
    upload(
      classifyNum: $classifyNum
      main: $main
      announcement: $announcement
      title: $title
      caption: $caption
    ) {
      id
    }
  }
`;
