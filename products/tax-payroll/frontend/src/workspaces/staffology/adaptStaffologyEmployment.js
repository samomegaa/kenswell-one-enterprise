import {
  asRecord,
  booleanLabel,
  firstValue,
} from './staffologyValueResolver';

import {
  createContractIndex,
  firstContractValue,
} from './staffologyContractResolver';

import {
  STAFFOLOGY_EMPLOYMENT_FIELDS,
} from './staffologyEmploymentFields';

function employeeSource(runtimeWorkspace) {
  const workspace = asRecord(
    runtimeWorkspace?.workspace
  );

  return asRecord(
    workspace.employee ||
    workspace.canonicalEmployee ||
    workspace.data?.employee ||
    workspace.data ||
    runtimeWorkspace?.employee
  );
}

function resolve(index, field) {
  return firstContractValue(
    index,
    STAFFOLOGY_EMPLOYMENT_FIELDS[field]
  );
}

function booleanValue(index, field) {
  return booleanLabel(
    resolve(index, field)
  );
}

export function adaptStaffologyEmployment(
  runtimeWorkspace
) {
  const source = employeeSource(runtimeWorkspace);
  const listedEmployee = asRecord(
    runtimeWorkspace?.employee
  );

  const index = createContractIndex(source);

  return Object.freeze({
    source,

    status: firstValue(
      resolve(index, 'status'),
      listedEmployee.status,
      listedEmployee.state,
      'Current'
    ),

    jobTitle:
      resolve(index, 'jobTitle'),

    workplacePostcode:
      resolve(index, 'workplacePostcode'),

    startDate:
      resolve(index, 'startDate'),

    continuousStartDate:
      resolve(index, 'continuousStartDate'),

    payrollCode: firstValue(
      resolve(index, 'payrollCode'),
      listedEmployee.payrollCode,
      listedEmployee.code
    ),

    declaration:
      resolve(index, 'declaration'),

    payrollIdChange:
      resolve(index, 'payrollIdChange'),

    onHold:
      booleanValue(index, 'onHold'),

    isDirector:
      booleanValue(index, 'isDirector'),

    directorshipStartDate:
      resolve(index, 'directorshipStartDate'),

    directorshipEndDate:
      resolve(index, 'directorshipEndDate'),

    alternativeNiMethod:
      booleanValue(index, 'alternativeNiMethod'),

    rightToWorkChecked:
      booleanValue(index, 'rightToWorkChecked'),

    worksInFreeport:
      booleanValue(index, 'worksInFreeport'),

    worksInInvestmentZone:
      booleanValue(
        index,
        'worksInInvestmentZone'
      ),

    isVeteran:
      booleanValue(index, 'isVeteran'),

    hasLeft:
      booleanValue(index, 'hasLeft'),

    secondedFromOverseas:
      booleanValue(
        index,
        'secondedFromOverseas'
      ),

    receivesRegisteredPensionIncome:
      booleanValue(
        index,
        'receivesRegisteredPensionIncome'
      ),

    cisSubcontractor:
      booleanValue(index, 'cisSubcontractor'),

    apprentice:
      booleanValue(index, 'apprentice'),

    furlough:
      booleanValue(index, 'furlough'),
  });
}
