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
      }
      classifyNum
      main
      announcement
      title
      caption
      isLiked
      isViewed
      viewsCount
      likesCount
      commentsCount
      views {
        id
      }
      likes {
        id
      }
      comments {
        id
        user {
          id
          userName
          avatar
        }
        text
      }
      createdAt
    }
  }
`;

export const TOGGLE_POST = gql`
  mutation togglePost($postId: String!) {
    togglePost(postId: $postId)
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
    }
  }
`;
