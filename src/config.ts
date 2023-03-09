const {
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_HOST_NAME,
  MONGO_DB_NAME
} = process.env

// export abstract class Config {
//   public static mongoUrl = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST_NAME}/${MONGO_DB_NAME}`
// }

export abstract class Config {
  public static mongoUrl = `mongodb://localhost:27017/soundry?retryWrites=true&w=majority`
}
