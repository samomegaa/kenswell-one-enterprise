const {
  EMPLOYEE_COMMAND_TYPES,
} = require('./employee-command-types');

class EmployeeCommandRegistry {
  constructor(types = EMPLOYEE_COMMAND_TYPES) {
    this.types = new Set(types);
  }

  has(type) {
    return this.types.has(type);
  }

  list() {
    return Object.freeze([...this.types]);
  }
}

module.exports = { EmployeeCommandRegistry };
