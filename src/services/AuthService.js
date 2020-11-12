import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const AUTH_SERVICE = {
  signup(userData) {
    return service.post("/api/signup", userData);
  },
  login(userData) {
    return service.post("/api/login", userData);
  },
  logout() {
    return service.post("/api/logout", {});
  },
  getAuthenticatedUser() {
    return service.get("/api/isLoggedIn");
  },
  updateProfile(userData) {
    return service.post("/api/edit-profile", userData);
  },
};

export default AUTH_SERVICE;
