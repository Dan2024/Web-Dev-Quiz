import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import dbClient from '../utils/dbClient.js';
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	COOKIE_KEY_1: process.env.COOKIE_KEY_1,
	COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
	callbackURL: '/auth/google/callback',
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
	console.log(profile);
	const user = await dbClient.user.findUnique({
		where: { googleId: profile.id },
	});

	if (!user) {
		const createdUser = await dbClient.user.create({
			data: {
				googleId: profile.id,
				email: profile.emails[0].value,
				name: profile.displayName,
				img: profile.photos[0].value,
			},
		});
		profile.googleID = profile.id;
		profile.id = createdUser.id;
	} else {
		profile.googleID = profile.id;
		profile.id = user.id;
	}

	done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
	done(null, {
		googleID: user.googleID,
		id: user.id,
		stat: user.stat ? user.stat : {},
		email: user.emails[0].value,
		name: user.displayName,
		img: user.photos[0].value,
	});
});

// Read the session from the cookie
passport.deserializeUser((obj, done) => {
	// User.findById(id).then(user => {
	//   done(null, user);
	// });
	done(null, obj);
});
