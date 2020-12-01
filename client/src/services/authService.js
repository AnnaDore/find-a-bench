import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:5000/",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (username, email, password) => {
    return this.service
      .post("/auth/signup", { username, email, password })
      .then((response) => response.data);
  };
  login = (email, password) => {
    return this.service
      .post("/auth/login", { email, password })
      .then((response) => response.data);
  };
  
  loggedin = () => {
    console.log('loggedin')
    return this.service.get("/auth/loggedin")
    .then((response) => response.data)
    .catch(err => {
      console.log(err)
    })
    

  };
  logout = () => {
    return this.service.get("/auth/logout").then((response) => response.data);
  };
  //   user = () => {
  //     return this.service.get("/user/:id").then((response) => response.data);
  //   }
}

export default AuthService;
