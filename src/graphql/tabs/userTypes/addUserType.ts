import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation addUserType($params: IAddUserTypeInput!) {
    addUserType(params: $params) {
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
    name: 'Business',
    active: false
  }
}

export default {
  name: 'addUserType',
  endpoint: '/graphql/userTypes',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
