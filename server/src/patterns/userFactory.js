// Base class for the users
class BaseUser {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
}

// Admin class
class AdminUser extends BaseUser {
    constructor(name, email) {
      super(name, email);
      this.role = 'admin';
    }
}

// Team lead class
class TeamLeadUser extends BaseUser {
    constructor(name, email) {
      super(name, email);
      this.role = 'teamlead';
    }
}
  
// Team member class
class TeamMemberUser extends BaseUser {
    constructor(name, email) {
      super(name, email);
      this.role = 'teammember';
    }
}
  
// Factory function
function userFactory(role, name, email) {
    switch (role) {
      case 'admin':
        return new AdminUser(name, email);
      case 'teamlead':
        return new TeamLeadUser(name, email);
      case 'teammember':
      default:
        return new TeamMemberUser(name, email);
    }
}
  
module.exports = userFactory;
  