import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query getGenre($params: IGenre!) {
    getGenre(params: $params) {
      _id
      name
      active
      createdAt
      updatedAt
    }
  }
`

const variables = {
  params: { _id: '' }
}

export default {
  name: 'getGenre',
  endpoint: '/graphql/genres',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
