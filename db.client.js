// require('dotenv').config();

const { Sequelize } = require('sequelize');

const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
} = process.env;

const databaseUrl = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(databaseUrl, {
	dialect: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

// authentication and synchronization
sequelize.authenticate()
	.then(() => {
		sequelize.sync().catch(() => console.log("Cannot sync the database"));
	})
	.catch(() => console.log("Cannot connect to database, please check environment credentials"));

module.exports = sequelize;
