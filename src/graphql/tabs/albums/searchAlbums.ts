import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query searchAlbums($params: IAlbum) {
    searchAlbums(params: $params) {
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

export default {
  name: 'searchAlbums',
  endpoint: '/graphql/albums',
  query: print(query)
}
