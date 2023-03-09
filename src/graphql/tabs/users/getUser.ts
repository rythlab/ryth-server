import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query getUser($params: IUser!) {
    getUser(params: $params) {
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
  }
`

const variables = {
  params: { _id: '' }
}

export default {
  name: 'getUser',
  endpoint: '/graphql/users',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
