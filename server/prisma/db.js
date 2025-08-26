import mongoose from 'mongoose'

const MAX_RETRIES = 3
const RETRY_INTERVAL = 5000 // 5 seconds

class CreateDatabaseConnection {
  constructor() {
    this.retries = 0
    this.isConnected = false
    this.retryCount = 0

    // mongoose configure settings
    mongoose.set('strictQuery', false) // Allows querying on fields not explicitly defined in the schema

    mongoose.connection.on('connect', () => {
      console.log('database connected successfully')
      this.isConnected = true
    })

    mongoose.connection.on('error', () => {
      console.log('database connection failed')
      this.isConnected = false
    })

    mongoose.connection.on('disconnected', () => {
      console.log('database disconnected')
      this.handleDisconnection()
    })

    process.on('SIGTERM', this.handleAppTermination.bind(this))
  }

  async connect() {
    try {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined')
      }

      const connectionOptions = {
        // Tells the MongoDB driver to use its newer URL string parser.
        // Note: This is the default in Mongoose v6+ and the option is no longer needed.
        // useNewUrlParser:true,

        // Opts into using the driver's newer connection management engine (Server Discovery and Monitoring).
        // Note: This is the default in Mongoose v6+ and the option is no longer needed.
        // useUnifiedTopology:true,

        // Sets the maximum number of connections Mongoose will keep open in its connection pool.
        // Helps manage database connections efficiently. Default is often 100 in recent drivers.
        maxPoolSize: 10,

        minPoolSize: 2, // Minimum number of connections to keep in the pool
        maxIdleTimeMS: 30000, // Close idle connections after 30 seconds

        // Sets the maximum time (in milliseconds) the driver will wait to find a suitable
        // database server (e.g., the primary in a replica set) before timing out. (5 seconds here)
        serverSelectionTimeoutMS: 5000,

        // Specifies how long (in milliseconds) a connection socket can remain idle
        // before the driver closes it. Helps prevent issues with firewalls closing inactive connections. (45 seconds here)
        socketTimeoutMS: 45000,

        // Forces the driver to use the IPv4 network protocol when connecting.
        // Set to 4 for IPv4, 6 for IPv6. If unspecified, it might try IPv6 first.
        family: 4,
      }

      console.log('database connected')

      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true) // Logs Mongoose database operations to the console for debugging.
      }

      mongoose.connect(process.env.DATABASE_URL, connectionOptions)
      this.retryCount = 0
    } catch (error) {
      this.handleConnectionError()
      return console.error(error)
    }
  }

  async handleConnectionError() {
    try {
      if (this.retryCount < MAX_RETRIES) {
        this.retryCount++
        console.log(
          `retry connection attempt... ${this.retryCount} / ${MAX_RETRIES} `,
        )

        await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL))
        await this.connect()
      } else {
        console.log('failed connection after retries')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  async handleDisconnection() {
    if (!this.isConnected) {
      console.log('attempat reconnect to database')
      await this.connect()
    }
  }

  async handleAppTermination() {
    try {
      await mongoose.connection.close()
      console.log('database connection closed')
      process.exit(0)
    } catch (error) {
      console.log(error.message)
      process.exit(1)
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      retryCount: this.retryCount,
      readyState: mongoose.connection.readyState,
      name: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
    }
  }
}

// Create singleton instance
const dbConnection = new CreateDatabaseConnection()
export default dbConnection.connect.bind(dbConnection)
export const getConnectionStatus =
  dbConnection.getConnectionStatus.bind(dbConnection)
