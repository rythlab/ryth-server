import { UserInputError } from 'apollo-server'

import Users from '../../models/users'
import { validateEmail, parsedSearchParams } from '../../utils'
import {
  User,
  IAddUserInput,
  IUpdateUserInput,
  IDeleteUserInput
} from '../../graphql/resolvers-types'
import { getUserType } from './userTypes'

export const getUser = async (
  _parent: Object | undefined,
  { params }: { params: User }
) => {
  const user = await Users.findOne(params).exec()
  const userType = await getUserType({}, { params: { _id: user.userType } })

  return {
    ...user._doc,
    userType
  }
}

const searchUsers = async (_parent: Object, { params }: { params: User }) => {
  const parsedParams = parsedSearchParams(params)
  const usersList = await Users.find(parsedParams).exec()

  const users = await Promise.all(
    usersList.map(async ({ userType, ...rest }) => {
      const userTypeRecord = await getUserType(undefined, {
        params: { _id: userType }
      })

      return {
        ...rest._doc,
        userType: userTypeRecord
      }
    })
  )

  return users
}

const addUser = async (
  _parent: Object,
  { params }: { params: IAddUserInput }
) => {
  if (!params.email || !params.userType) {
    throw new UserInputError('Invalid arguments input')
  }

  const isEmailValid = validateEmail(params.email)
  const userType = await getUserType(undefined, {
    params: { _id: params.userType }
  })

  if (!userType || !isEmailValid) {
    throw new UserInputError('User type not found')
  }

  const user = await Users.create({
    ...params,
    active: params.active || true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  return await getUser(undefined, { params: { _id: user._id } })
}

const updateUser = async (
  _parent: Object,
  { params }: { params: IUpdateUserInput }
) => {
  const updateParams = { ...params }
  delete updateParams._id

  const user = await Users.findOneAndUpdate(
    { _id: params._id },
    {
      ...updateParams,
      updatedAt: new Date().toISOString()
    }
  )

  return await getUser(undefined, { params: { _id: user._id } })
}

const deleteUser = async (
  _parent: Object,
  { params }: { params: IDeleteUserInput }
) => {
  const artist = await Users.findByIdAndRemove(params._id).exec()
  return !!artist
}

export default {
  Query: {
    getUser,
    searchUsers
  },
  Mutation: {
    addUser,
    updateUser,
    deleteUser
  }
}
