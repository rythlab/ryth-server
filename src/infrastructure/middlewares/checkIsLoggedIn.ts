import { AuthenticationError } from 'apollo-server-core'
import errorHandler from '../../controllers/errorHandler'

const checkIsLoggedIn = async (req: any, getAuthUser: any) => {
  try {
    // Check if user is logged in
    const authUser = await getAuthUser(req)

    if (!authUser) {
      throw new AuthenticationError('You are not logged in')
    }
  } catch (error) {
    errorHandler(error)
  }
}

export default checkIsLoggedIn
