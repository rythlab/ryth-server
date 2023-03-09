import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation addAlbum($params: IAddAlbumInput!) {
    addAlbum(params: $params) {
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
  params: { name: 'Album Test', artist: '', releaseYear: '1995', genres: [] }
}

export default {
  name: 'addAlbum',
  endpoint: '/graphql/albums',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
