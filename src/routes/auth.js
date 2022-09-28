import { Router } from 'express';
import passport from 'passport';

const router = new Router();
router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth/failure',
		successRedirect: 'http://localhost:3000/lobby',
		session: true,
	})
	// (req, res) => {
	//   console.log('Google called us back!')
	// }
);

router.get('/logout', (req, res) => {
	req.logout(); //Removes req.user and clears any logged in session
	res.send('user logged in');
});

router.get('/failure', (req, res) => {
	return res.send('Failed to log in!');
});

export default router;
