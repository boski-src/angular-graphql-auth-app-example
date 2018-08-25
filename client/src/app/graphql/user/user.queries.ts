import gql from 'graphql-tag';

export namespace UserQueries {
  export const userMe = gql`
    query userMe {
      userMe {
        _id
        name
        email
        updatedAt
        createdAt
      }
    }
  `;
}