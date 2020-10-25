const { gql } = require("apollo-boost");

export const ME = gql`
subscription Me($userId: String) {
    users(where: {user_id: {_eq: $userId}}) {
      id
      user_id
      name
      username
      profile_image
      last_checked
    }
  }
`;

export const GET_POST = gql`
subscription getPost($postId: uuid!) {
  posts_by_pk(id: $postId) {
    id
    caption
    created_at
    location
    media
    user {
      id
      username
      name
      profile_image
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
    likes{
      id
      user_id
    }
    saved_posts {
      id
      user_id
    }
    comments(order_by: {created_at: desc, user: {username: asc}}) {
      id
      constent
      created_at
      user {
        username
        profile_image
      }
    }
  }
}
`;