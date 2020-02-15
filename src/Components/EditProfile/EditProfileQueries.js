import { gql } from "apollo-boost";

export const EDIT_PROFILE = gql`
  mutation editUser(
    $id: String!
    $avatar: String
    $birthday: String
    $phoneNum: String
    $password: String
    $introduce: String
    $action: ACTIONS!
  ) {
    editUser(
      id: $id
      avatar: $avatar
      birthday: $birthday
      phoneNum: $phoneNum
      password: $password
      introduce: $introduce
      action: $action
    ) {
      id
    }
  }
`;
export const GET_USER = gql`
  query seeProfileById($id: String!) {
    seeProfileById(id: $id) {
      id
      avatar
      email
      userName
      birthday
      phoneNum
      email
      introduce
      password
      classes
    }
  }
`;
