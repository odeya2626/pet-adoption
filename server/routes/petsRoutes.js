const express = require("express");
const petsController = require("../controllers/petsControllers");
const {
  convertTypesBack,
  statusNotAvailable,
} = require("../middleware/petsMiddleware");
const { validateBody } = require("../middleware/validateBody");
const { petSchema } = require("../schemas/petsSchema");
const { upload, generateUrl } = require("../middleware/imagesMiddleware");
const { isAdmin, auth } = require("../middleware/usersMiddleware");
const router = express.Router();

router
  .route("/")
  .get(petsController.getSearchedPets)
  .post(
    auth,
    isAdmin,
    upload.single("img"),
    generateUrl,
    convertTypesBack,
    validateBody(petSchema),
    statusNotAvailable,
    petsController.postPet
  );

router
  .route("/:id")
  .get(petsController.getPetById)
  .put(
    auth,
    isAdmin,
    upload.single("img"),
    generateUrl,
    convertTypesBack,
    validateBody(petSchema),
    statusNotAvailable,
    petsController.editPet
  );
router.post("/:id/adopt", auth, petsController.adoptPet);
router.post("/:id/return", auth, petsController.returnPet);
router
  .route("/:id/save")
  .post(auth, petsController.savePet)
  .delete(auth, petsController.deleteSavedPet);
router.get("/user/:id", auth, petsController.getUserPets);
router.get("/all/:offset", auth, isAdmin, petsController.getPets);

module.exports = router;
