import { UserInputError } from 'apollo-server'

import {
  IAddAlbumInput,
  IUpdateAlbumInput,
  IDeleteAlbumInput,
  Album
} from '../../graphql/resolvers-types'
import Albums from '../../models/albums'
import { parsedSearchParams } from '../../utils/mongo'
import { getGenres } from './genres'
import { getUser } from './users'

const getAlbum = async (
  _: Object | undefined,
  { params }: { params: Album }
) => {
  const {
    genres: genresParams,
    artist,
    ...rest
  } = await Albums.findOne(params).exec()

  return {
    ...rest._doc,
    genres: genresParams && (await getGenres(genresParams)),
    artist: await getUser(undefined, { params: { _id: artist } })
  }
}

const searchAlbums = async (
  _: Object | undefined,
  { params }: { params: Album }
) => {
  const parsedParams = parsedSearchParams(params)
  const albumsList = await Albums.find(parsedParams).exec()

  const albums = await Promise.all(
    albumsList.map(async ({ genres = [], artist, ...rest }) => ({
      ...rest._doc,
      artist: getUser(undefined, { params: { _id: artist } }),
      genres: getGenres(genres)
    }))
  )

  return albums
}

const addAlbum = async (
  _: Object | undefined,
  { params }: { params: IAddAlbumInput }
) => {
  const artist = await getUser({}, { params: { _id: params.artist } })
  const genres = await getGenres(params.genres as string[])

  if (!artist || genres.length !== params.genres.length) {
    throw new UserInputError('Invalid argument value')
  }

  const album = await Albums.create({
    ...params,
    artist: artist._id,
    genres: genres.map((x) => x._id),
    active: params.active || true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  return await getAlbum(undefined, { params: { _id: album._id } })
}

const updateAlbum = async (
  _: Object | undefined,
  { params }: { params: IUpdateAlbumInput }
) => {
  const updateParams = { ...params }
  delete updateParams._id

  // validate genres
  if (params.genres) {
    const validGenres = await getGenres(params.genres as string[])
    const isValid = validGenres.length === params.genres.length
    if (!isValid) throw new UserInputError('Invalid argument value')
  }

  const album = await Albums.findOneAndUpdate(
    { _id: params._id },
    {
      ...updateParams,
      updatedAt: new Date().toISOString()
    }
  )

  return await getAlbum(undefined, { params: { _id: album._id } })
}

const deleteAlbum = async (
  _: Object | undefined,
  { params }: { params: IDeleteAlbumInput }
) => {
  const album = await Albums.findByIdAndRemove(params._id).exec()
  return !!album
}

export default {
  Query: {
    getAlbum,
    searchAlbums
  },
  Mutation: {
    addAlbum,
    updateAlbum,
    deleteAlbum
  }
}
