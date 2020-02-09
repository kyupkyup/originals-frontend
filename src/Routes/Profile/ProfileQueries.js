import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeProfile($email: String!) {
    seeProfile(email: $email) {
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
      posts {
        id
        title
        classifyNum
        viewsCount
        likesCount
      }
      postsCount
      comments {
        id
        text
        likesCount
      }
      commentsCount
      reservations {
        book {
          id
          photo {
            id
            url
          }
          author
          title
        }
        startDate
        endDate
        createdAt
      }
      reservationsCount
      likes {
        id
        post {
          id
          title
          author {
            id
            userName
          }
          likesCount
          viewsCount
        }
      }
      likesCount
      participants {
        id
        meeting {
          id
          title
          meetingTime
          meetingPlace
          meetingPrice
          meetingHeadCounts
          participants {
            id
            user {
              id
              avatar
              userName
            }
          }
          participantsCount
        }
      }
      participantsCount
      isSelf
      createdAt
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
