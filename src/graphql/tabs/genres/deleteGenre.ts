import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation deleteGenre($params: IDeleteGenreInput!) {
    deleteGenre(params: $params)
  }
`

const variables = {
  params: {
    _id: ''
  }
}

export default {
  name: 'deleteGenre',
  endpoint: '/graphql/genres',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
