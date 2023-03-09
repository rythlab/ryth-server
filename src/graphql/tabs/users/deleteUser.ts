import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation deleteUser($params: IDeleteUserInput!) {
    deleteUser(params: $params)
  }
`

const variables = {
  params: {
    _id: ''
  }
}

export default {
  name: 'deleteUser',
  endpoint: '/graphql/users',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
