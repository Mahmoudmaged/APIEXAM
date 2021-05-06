const app = require("express").Router();
const auth = require("../midleware/auth")
/* start signUp */
const signUpValidator = require("../midleware/signUp.validate");
const signUpController = require("../controller/signUp.controller");
app.post("/handleSignUp", signUpValidator, signUpController);
/* end signUp */
/* start checkemailController */
const checkemailController = require("../controller/checkemail.controller");
app.get("/checkemail/:token", checkemailController)
/* End checkemailController */

/* Start login */
const signInValidator = require("../midleware/signIn.validator");
const signInVasignInController = require("../controller/signIn.Controller");
app.post('/handelSignIn', signInValidator, signInVasignInController);
/* End login */

/* start home */
const homeController= require("../controller/home.controller")
app.get('/home', auth,homeController);
/* End home */
const addNoteValidate = require("../midleware/addnote.vlidate");
const addPostContreoller= require("../controller/addNote.controller");
app.post('/addPost',auth,addNoteValidate,addPostContreoller);


/*   displyPorofile */
const displayProfile= require("../controller/displyProfile.controller");
app.get('/displayProfile',auth,displayProfile);

const deleteController = require("../controller/delete.controller")
app.delete('/deletePost', auth,deleteController);

const updateController = require("../controller/updateController");
app.put('/updatePost', auth,updateController);

module.exports = app;