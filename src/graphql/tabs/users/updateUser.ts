import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation updateUser($params: IUpdateUserInput!) {
    updateUser(params: $params) {
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
    }
  }
`

const variables = {
  params: {
    _id: '',
    name: 'User 1.2',
    description: 'Fucking loser loser',
    userType: '',
    contact: '023424',
    email: 'user_1.2@gmail.com',
    accessToken: ''
  }
}

export default {
  name: 'updateUser',
  endpoint: '/graphql/users',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
