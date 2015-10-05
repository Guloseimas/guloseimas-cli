'use strict';

module.exports = {
	db: 'mongodb://localhost/guloseimas',
	app: {
		title: 'guloseimas-client - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '',
		clientSecret: process.env.FACEBOOK_SECRET || '',
		callbackURL: '/auth/facebook/callback'
	},
	pagseguro: {
		clientMail: process.env.PAGSEGURO_MAIL || '',
		clientSecret: process.env.PAGSEGURO_SECRET || '',
		clientUrl: process.env.PAGSEGURO_URL ||'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout' 
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		analytics: process.env.GOOGLE_ANALYTICS || '',
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'administrador@musicamise.com.br',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'Zoho',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'administrador@musicamise.com.br',
				pass: process.env.MAILER_PASSWORD || ''
			}
		}
	}
};
