const router = require("express").Router();

const { getUserProfileCtrl } = require("../controllers/usersController.js");
const { updateUserProfileCtrl } = require("../controllers/usersController.js");
const { getUsersCountCtrl } = require("../controllers/usersController.js");
const { deleteUserProfileCtrl } = require("../controllers/usersController.js");
const { profilePhotoUploadCtrl } = require("../controllers/usersController.js");
const { getAllUsersCtrl } = require("../controllers/usersController.js");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser,verifyToken, verifyTokenAndAuthorization} = require("../middlewares/verifyToken");


// /api/users/profile
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/users/profile/:id
router.route("/profile/:id").get(validateObjectId, getUserProfileCtrl)
.put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)
.delete(validateObjectId,verifyTokenAndAuthorization,deleteUserProfileCtrl);


// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")
.post(verifyToken,photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;
