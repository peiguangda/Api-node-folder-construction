import * as express from "express";
import { UserController } from "../controllers/userController";
import { LanguageController } from "../controllers/language";
import { validatePostUser } from "../middlewares/validate";

const router = express.Router();

router.get("/users", new UserController().getUsers);
router.post("/user", validatePostUser, new UserController().saveUser);
router.put("/user/:id", new UserController().updateUser);
router.delete("/user/:id", new UserController().deleteUser);

router.get("/languages", new LanguageController().getLanguage);

module.exports = router;
