import gql from 'graphql-tag';

export namespace UserMutations {
  export const userLogin = gql`
    mutation ($email: String!, $password: String!) {
      userLogin(email: $email, password: $password)
    }
  `;

  export const userRegister = gql`
    mutation ($name: String!, $email: String!, $password: String!) {
      userRegister(name: $name, email: $email, password: $password) {
        name
        email
      }
    }
  `;
}