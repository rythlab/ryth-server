import {
  Genre,
  IDeleteGenreInput,
  IUpdateGenreInput,
  IAddGenreInput
} from '../../graphql/resolvers-types'
import Genres from '../../models/genres'
import { parsedSearchParams } from '../../utils/mongo'

export const getGenres = async (genres: string[]) => {
  const availableGenres = [...new Set(genres.filter(Boolean))]

  const genresList = await Promise.all(
    availableGenres.map(async (_id) => await getGenre({}, { params: { _id } }))
  )

  return genresList
}

const getGenre = async (_parent: Object, { params }: { params: Genre }) => {
  return await Genres.findOne(params).exec()
}

const searchGenres = async (_parent: Object, { params }: { params: Genre }) => {
  const parsedParams = parsedSearchParams(params)
  return await Genres.find(parsedParams).exec()
}

const addGenre = async (
  _parent: Object,
  { params }: { params: IAddGenreInput }
) => {
  return await Genres.create({
    ...params,
    active: params.active || true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
}

const updateGenre = async (
  _parent: Object,
  { params }: { params: IUpdateGenreInput }
) => {
  const updateParams = { ...params }
  delete updateParams._id

  return await Genres.findOneAndUpdate(
    { _id: params._id },
    {
      ...updateParams,
      updatedAt: new Date().toISOString()
    }
  )
}

const deleteGenre = async (
  _parent: Object,
  { params }: { params: IDeleteGenreInput }
) => {
  const genre = await Genres.findByIdAndRemove(params._id).exec()
  return !!genre
}

export default {
  Query: {
    getGenre,
    searchGenres
  },
  Mutation: {
    addGenre,
    updateGenre,
    deleteGenre
  }
}
