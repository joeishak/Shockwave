let authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });
const images = require('./controllers/images');
const traffic = require('./controllers/traffic');
const health = require('./controllers/health');

module.exports = function (app) {
       app.post('/signup', authentication.signup);
       app.post('/signin', requireSignIn, authentication.signin);
       app.get('/img', images.testImages);
       app.get('/puppy', images.getImages);
       app.get('/heartbeat', health.heartbeat);
       app.get('/traffic',traffic.getAllTrafficCams);
}
