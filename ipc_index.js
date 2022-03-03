const { products, productsAdd } = require('./firebaseHandler/firestoreHandler');
const { firebaseSignUp, firebaseSignIn, firebaseAuthGetCurrentUser } = require('./firebaseHandler/firebaseAuthHandler');

module.exports = {
    products,
    productsAdd,
    firebaseSignUp,
    firebaseSignIn,
    firebaseAuthGetCurrentUser
}