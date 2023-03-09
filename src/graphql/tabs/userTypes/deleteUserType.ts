import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation deleteUserType($params: IDeleteUserTypeInput!) {
    deleteUserType(params: $params)
  }
`

const variables = {
  params: {
    _id: ''
  }
}

export default {
  name: 'deleteUserType',
  endpoint: '/graphql/userTypes',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
