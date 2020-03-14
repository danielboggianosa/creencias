import env from '../env'

export default {
    name: env.database.name, //enviroment variables tomadas de una archivo ignorado para git
    user: env.database.user, //En producción se debe crear un archivo que contenga todas la configuraciones
    pass: env.database.pass,
    connection:{
        host: env.database.host,
        logging: false,
        dialect: "mysql",
        dialectOptions: {
            timezone: '-05:00'
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            paranoid: true
        }
    }
}