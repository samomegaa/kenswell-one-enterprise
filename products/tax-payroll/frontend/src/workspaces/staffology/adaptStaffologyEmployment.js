import {
  asRecord,
  booleanLabel,
  firstPath,
  firstValue,
} from './staffologyValueResolver';

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

function employmentSource(source) {
  return asRecord(
    firstValue(
      source.employmentDetails,
      source.employment,
      source.jobDetails,
      source
    )
  );
}

export function adaptStaffologyEmployment(
  runtimeWorkspace
) {
  const source = employeeSource(runtimeWorkspace);
  const employment = employmentSource(source);

  return Object.freeze({
    source,

    status: firstValue(
      employment.status,
      source.status,
      source.state,
      'Current'
    ),

    jobTitle: firstValue(
      employment.jobTitle,
      employment.role,
      source.jobTitle
    ),

    workplacePostcode: firstValue(
      employment.workplacePostcode,
      employment.workPlacePostcode,
      source.workplacePostcode
    ),

    startDate: firstValue(
      employment.startDate,
      firstPath(source, [
        'starterDetails.startDate',
        'startDate',
      ])
    ),

    continuousStartDate: firstValue(
      employment.continuousStartDate,
      employment.continuousEmploymentStartDate,
      source.continuousStartDate
    ),

    payrollCode: firstValue(
      employment.payrollCode,
      source.payrollCode,
      source.employeeCode,
      source.code
    ),

    declaration: firstValue(
      employment.declaration,
      employment.starterDeclaration,
      firstPath(source, [
        'starterDetails.declaration',
        'starterDetails.starterDeclaration',
      ])
    ),

    payrollIdChange: firstValue(
      employment.payrollIdChange,
      employment.changeOfPayrollId,
      employment.payrollCodeChange
    ),

    onHold: booleanLabel(
      firstValue(
        employment.onHold,
        source.onHold,
        false
      )
    ),

    isDirector: booleanLabel(
      firstValue(
        employment.isDirector,
        employment.director,
        source.isDirector,
        false
      )
    ),

    directorshipStartDate: firstValue(
      employment.directorshipStartDate,
      employment.startOfDirectorship,
      source.directorshipStartDate
    ),

    directorshipEndDate: firstValue(
      employment.directorshipEndDate,
      employment.endOfDirectorship,
      source.directorshipEndDate
    ),

    alternativeNiMethod: booleanLabel(
      firstValue(
        employment.alternativeNiMethod,
        employment.alternativeMethod,
        employment.directorNiAlternativeMethod,
        false
      )
    ),

    rightToWorkChecked: booleanLabel(
      firstValue(
        employment.rightToWorkChecked,
        employment.rightToWorkHasBeenChecked,
        false
      )
    ),

    worksInFreeport: booleanLabel(
      firstValue(
        employment.worksInFreeport,
        employment.isFreeportEmployee,
        false
      )
    ),

    worksInInvestmentZone: booleanLabel(
      firstValue(
        employment.worksInInvestmentZone,
        employment.isInvestmentZoneEmployee,
        false
      )
    ),

    isVeteran: booleanLabel(
      firstValue(
        employment.isVeteran,
        employment.veteran,
        false
      )
    ),

    hasLeft: booleanLabel(
      firstValue(
        employment.hasLeft,
        employment.employeeHasLeft,
        source.hasLeft,
        false
      )
    ),

    secondedFromOverseas: booleanLabel(
      firstValue(
        employment.secondedFromOverseas,
        employment.secondedFromOverseasEmployer,
        false
      )
    ),

    receivesRegisteredPensionIncome: booleanLabel(
      firstValue(
        employment.receivesRegisteredPensionIncome,
        employment.paidPensionOrRegisteredIncome,
        false
      )
    ),

    cisSubcontractor: booleanLabel(
      firstValue(
        employment.cisSubcontractor,
        employment.isCisSubcontractor,
        false
      )
    ),

    apprentice: booleanLabel(
      firstValue(
        employment.apprentice,
        employment.isApprentice,
        false
      )
    ),

    furlough: booleanLabel(
      firstValue(
        employment.furlough,
        employment.isOnFurlough,
        employment.onFurlough,
        false
      )
    ),
  });
}
