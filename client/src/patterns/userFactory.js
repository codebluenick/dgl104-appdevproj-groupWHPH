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
      this.role = 'Admin';
    }
}

// Team lead class
class TeamLeadUser extends BaseUser {
    constructor(name, email) {
      super(name, email);
      this.role = 'TeamLead';
    }
}
  
// Team member class
class TeamMemberUser extends BaseUser {
    constructor(name, email) {
      super(name, email);
      this.role = 'TeamMember';
    }
}
  
// Factory function
function userFactory(role, name, email) {
    switch (role) {
      case 'Admin':
        return new AdminUser(name, email);
      case 'TeamLead':
        return new TeamLeadUser(name, email);
      case 'TeamMember':
      default:
        return new TeamMemberUser(name, email);
    }
}
  
module.exports = userFactory;
  