import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation updateGenre($params: IUpdateGenreInput!) {
    updateGenre(params: $params) {
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
    _id: '',
    name: 'Organization',
    active: true
  }
}

export default {
  name: 'updateGenre',
  endpoint: '/graphql/genres',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
