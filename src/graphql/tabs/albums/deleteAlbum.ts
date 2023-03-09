import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation deleteAlbum($params: IDeleteAlbumInput!) {
    deleteAlbum(params: $params)
  }
`

const variables = {
  params: {
    _id: ''
  }
}

export default {
  name: 'deleteAlbum',
  endpoint: '/graphql/users',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
