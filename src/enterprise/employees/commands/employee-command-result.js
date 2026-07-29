function employeeCommandAccepted(command) {
  return Object.freeze({
    accepted: true,
    commandId: command.id,
    commandType: command.type,
    status: 'application_boundary_reached',
    providerExecution: false,
    persistenceExecution: false,
  });
}

module.exports = { employeeCommandAccepted };
