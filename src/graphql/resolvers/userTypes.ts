import {
  UserType,
  IDeleteUserTypeInput,
  IUpdateUserTypeInput,
  IAddUserTypeInput
} from '../../graphql/resolvers-types'
import UserTypes from '../../models/userTypes'
import { parsedSearchParams } from '../../utils/mongo'

export const getUserType = async (
  _: Object | undefined,
  { params }: { params: UserType }
) => {
  const userType = await UserTypes.findOne(params).exec()
  return userType
}

const searchUserTypes = async (
  _: Object | undefined,
  { params }: { params: UserType }
) => {
  const parsedParams = parsedSearchParams(params)
  return await UserTypes.find(parsedParams).exec()
}

const addUserType = async (
  _: Object | undefined,
  { params }: { params: IAddUserTypeInput }
) => {
  return await UserTypes.create({
    ...params,
    active: params.active || true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

const updateUserType = async (
  _: Object | undefined,
  { params }: { params: IUpdateUserTypeInput }
) => {
  const updateParams = { ...params }
  delete updateParams._id

  const userType = await UserTypes.findOneAndUpdate(
    { _id: params._id },
    {
      ...updateParams,
      updatedAt: new Date().toISOString()
    }
  )

  return await getUserType(undefined, { params: { _id: userType._id } })
}

const deleteUserType = async (
  _: Object | undefined,
  { params }: { params: IDeleteUserTypeInput }
) => {
  const UserType = await UserTypes.findByIdAndRemove(params._id).exec()
  return !!UserType
}

export default {
  Query: {
    getUserType,
    searchUserTypes
  },
  Mutation: {
    addUserType,
    updateUserType,
    deleteUserType
  }
}
