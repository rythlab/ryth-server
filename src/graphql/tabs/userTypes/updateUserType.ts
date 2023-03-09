import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation updateUserType($params: IUpdateUserTypeInput!) {
    updateUserType(params: $params) {
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
    _id: '',
    name: 'Organization',
    active: true
  }
}

export default {
  name: 'updateUserType',
  endpoint: '/graphql/userTypes',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
