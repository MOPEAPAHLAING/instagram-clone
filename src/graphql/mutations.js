const { gql } = require("apollo-boost");

export const CREATE_USER = gql`
    mutation createUsers($userId: String!, $name: String!, $username: String!, $email: String!, $bio: String!, $website: String!, $profileImage: String!, $phoneNumber: String!) {
        insert_users(objects: {user_id: $userId, username: $username, website: $website, email: $email, profile_image: $profileImage, phone_number: $phoneNumber, name: $name, bio: $bio}){
            affected_rows
        }
    }
`;

export const EDIT_USER = gql`
mutation editUser($id: uuid!, $name: String!, $username: String!, $websit: String!, $bio: String!, $email: String!, $phoneNumber: String!) {
    update_users(where: {id: {_eq: $id}}, _set: {name: $name, username: $username, website: $websit, bio: $bio, phone_number: $phoneNumber, email: $email}) {
      affected_rows
    }
  }
`;

export const EDIT_USER_AVATAR = gql`
mutation editUserAvatar($id: uuid!, $profileImage: String!) {
    update_users(where: {id: {_eq: $id}}, _set: {
      profile_image: $profileImage
    }) {
      affected_rows
    }
  }
`;