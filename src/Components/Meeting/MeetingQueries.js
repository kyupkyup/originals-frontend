import { gql } from "apollo-boost";

export const PARTICIPATE = gql`
  mutation participate($id: String!) {
    participate(meetingId: $id)
  }
`;
