import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query searchUsers($params: IUser) {
    searchUsers(params: $params) {
      _id
      name
      description
      userType {
        _id
        name
      }
      contact
      email
      accessToken
      active
      createdAt
      updatedAt
    }
  }
`

export default {
  name: 'searchUsers',
  endpoint: '/graphql/users',
  query: print(query)
}
