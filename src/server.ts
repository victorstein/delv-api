import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import { buildSchema } from 'type-graphql'
import resolvers from './resolvers'
import 'dotenv/config'

(async () => {
  // Get all the env variables needed
  const {
    DEV_DB_USER,
    DEV_DB_PASSWORD,
    DEV_DB_URI,
    DB_USER,
    DB_PASSWORD,
    DB_URI,
    NODE_ENV,
    PORT
  } = process.env

  // Create express app
  const app = express()

  // Choose between development and production credentials
  // If DEV
  let USER = DEV_DB_USER
  let PASSWORD = DEV_DB_PASSWORD
  let URI = DEV_DB_URI

  // If PROD
  if (NODE_ENV === 'production') {
    USER = DB_USER
    PASSWORD = DB_PASSWORD
    URI = DB_URI 
  }
  
  // Connect to the database
  await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Create Schemas
  const schema = await buildSchema({
    resolvers
  })

  // Create apollo server
  const server = new ApolloServer({
    schema
  })

  server.applyMiddleware({ app })

  app.listen(PORT, () => console.log(`Server is runing at: http://localhost:${PORT}/graphql`))
})()