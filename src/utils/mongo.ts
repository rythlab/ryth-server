import { _FilterQuery } from 'mongoose'

export const parsedSearchParams = <T>(params: T) => {
  if (!params) {
    return params
  }

  return Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(typeof value === 'string'
        ? {
            [key]: {
              $regex: value
            }
          }
        : {})
    }),
    {}
  )
}
