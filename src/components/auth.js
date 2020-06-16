class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(val) {
      this.authenticated = true;
      return "login"
    }
  
    logout(cb) {
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }

  }
  
  export default new Auth();
  