import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query searchUserTypes($params: IUserType) {
    searchUserTypes(params: $params) {
      _id
      name
      active
      createdAt
      updatedAt
    }
  }
`

export default {
  name: 'searchUserTypes',
  endpoint: '/graphql/users',
  query: print(query)
}
