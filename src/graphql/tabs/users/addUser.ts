import { gql } from 'apollo-server'
import { print } from 'graphql'

const query = gql`
  mutation addUser($params: IAddUserInput!) {
    addUser(params: $params) {
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
    name: 'User 1',
    description: 'Fucking loser',
    userType: '',
    contact: '023424',
    email: 'user_1@gmail.com',
    accessToken: ''
  }
}

export default {
  name: 'addUser',
  endpoint: '/graphql/users',
  query: print(query),
  variables: JSON.stringify(variables, null, 2)
}
