import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query getAlbum($params: IAlbum!) {
    getAlbum(params: $params) {
      _id
      name
      artist {
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
      releaseYear
      genres {
        _id
        name
        active
        createdAt
        updatedAt
      }
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
  name: 'getAlbum',
  endpoint: '/graphql/albums',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
