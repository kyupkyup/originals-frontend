import { gql } from "apollo-boost";

export const SEE_MEETING = gql`
  query seeMeeting($id: String!) {
    seeMeeting(id: $id) {
      id
      title
      main
      user {
        id
        avatar
        userName
        classes
        email
      }
      meetingTime
      meetingPlace
      meetingPrice
      deadline
      coords
      meetingHeadCounts
      participants {
        id
        user {
          id
          userName
          avatar
          classes
          email
        }
      }

      isParticipated
      participantsCount
      createdAt
    }
  }
`;

export const EDIT_MEETING = gql`
  mutation editMeeting(
    $id: String!
    $title: String!
    $main: Boolean!
    $meetingTime: String!
    $meetingPlace: String!
    $meetingPrice: String!
    $deadline: String!
    $coords: String!
    $meetingHeadCounts: Int!
    $action: ACTIONS!
  ) {
    editMeeting(
      id: $id
      title: $title
      main: $main
      meetingTime: $meetingTime
      meetingPlace: $meetingPlace
      meetingPrice: $meetingPrice
      deadline: $deadline
      coords: $coords
      meetingHeadCounts: $meetingHeadCounts
      action: $action
    ) {
      id
    }
  }
`;

export const WRITE_MEETING = gql`
  mutation uploadMeeting(
    $title: String!
    $main: Boolean!
    $meetingTime: String!
    $meetingPlace: String!
    $meetingPrice: String!
    $deadline: String!
    $coords: String
    $meetingHeadCounts: Int!
  ) {
    uploadMeeting(
      title: $title
      main: $main
      meetingTime: $meetingTime
      meetingPlace: $meetingPlace
      meetingPrice: $meetingPrice
      deadline: $deadline
      coords: $coords
      meetingHeadCounts: $meetingHeadCounts
    ) {
      id
    }
  }
`;
