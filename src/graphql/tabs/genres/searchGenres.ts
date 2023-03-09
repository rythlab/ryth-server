import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query searchGenres($params: IGenre) {
    searchGenres(params: $params) {
      _id
      name
      active
      createdAt
      updatedAt
    }
  }
`

export default {
  name: 'searchGenres',
  endpoint: '/graphql/genres',
  query: print(query)
}
