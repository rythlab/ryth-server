import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation addGenre($params: IAddGenreInput!) {
    addGenre(params: $params) {
      _id
      name
      active
      createdAt
      updatedAt
    }
  }
`

const variables = {
  params: {
    name: 'Business',
    active: false
  }
}

export default {
  name: 'addGenre',
  endpoint: '/graphql/genres',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
