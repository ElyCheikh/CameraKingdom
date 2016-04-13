var ids = {
  facebook: {
    clientID: '154021398315208',
    clientSecret: 'c20d788a5b6b5702fb81d2a77d3791c9',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email', 'username']
  },
  github: {
    clientID: '48c41979fa4cf1d91eb5',
    clientSecret: '79b562d13a1aa87ccb897cd084b07cda17604539',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  google: {
    clientID: '177196776499-rml8fbbq0e49vr9ro3tekambk7ihotu7.apps.googleusercontent.com',
    clientSecret: 'LhRD_tkUC__biKDIxsvqotQg',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  instagram: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://localhost:3000/auth/instagram/callback'
  },
   twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  }
};
module.exports = ids;