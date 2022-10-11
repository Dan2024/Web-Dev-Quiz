import express from 'express';
import helmet from 'helmet';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';
import './services/passport.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import usersRoute from './routes/users.js';
import questionRoute from './routes/question.js';
import * as dotenv from 'dotenv';
import { getJavascriptQuestions } from '../src/puppeteer/getJavascriptQuestions.js';

dotenv.config();

const config = {
	CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	COOKIE_KEY_1: process.env.COOKIE_KEY_1,
	COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

getJavascriptQuestions();

const app = express();
app.use(helmet());
app.use(
	cors({
		credentials: true,
		origin: ['http://localhost:3000', 'http://localhost:3000/lobby'],
	})
);
app.use(
	cookieSession({
		name: 'session',
		maxAge: 24 * 60 * 60 * 1000,
		keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/users', usersRoute);
app.use('/question', questionRoute);

const port = 4000;
app.listen(port, () => {
	console.log(`\n Server is running on port ${port}\n`);
});
