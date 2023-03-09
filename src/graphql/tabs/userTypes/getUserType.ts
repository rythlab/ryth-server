import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  query getUserType($params: IUserType!) {
    getUserType(params: $params) {
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
  name: 'getUserType',
  endpoint: '/graphql/userTypes',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
