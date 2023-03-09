import { ApolloError } from 'apollo-server-core'

const handleCastError = (error: { path: any; value: any }) => {
  const message = `Invalid ${error.path}: ${error.value}`
  throw new ApolloError(message, 'GRAPHQL_VALIDATION_FAILED')
}

const handleValidationError = (error: {
  errors: { [s: string]: unknown } | ArrayLike<unknown>
}) => {
  const message = Object.values(error.errors).map((el: any) => el.message)
  throw new ApolloError(
    `Invalid input: ${message.join(', ')}`,
    'GRAPHQL_VALIDATION_FAILED'
  )
}

const errorHandler = (err: any) => {
  if (err.name === 'CastError') handleCastError(err)
  if (err.name === 'ValidationError') handleValidationError(err)
  throw err
}

export default errorHandler
