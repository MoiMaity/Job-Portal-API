import { registerUser, authenticateUser } from "../model/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("auth/user-register");
  }

  getLogin(req, res) {
    res.render("auth/user-login", { error: null });
  }

  addUser(req, res) {
    const { name, email, password } = req.body;
    registerUser({ id: users.length + 1, name, email, password });
    res.redirect("/login", { error: null });
  }

  loginUser(req, res) {
    const user = authenticateUser(req.body);
    if (user) {
      req.session.user = user;
      res.redirect("/jobs");
    } else {
      res.render("auth/user-login", { error: "Invalid credentials" });
    }
  }

  logoutUser(req, res) {
    req.session.destroy(() => res.redirect("/login"));
  }
}
