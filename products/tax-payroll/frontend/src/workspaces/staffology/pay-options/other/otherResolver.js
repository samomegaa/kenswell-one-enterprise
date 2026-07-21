import {
  contractMatches,
} from '../../staffologyContractResolver';

const PREFERRED_SEGMENTS = Object.freeze([
  'other',
  'payoptions',
  'paydetails',
  'employmentdetails',
  'employee',
]);

function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function score(match) {
  const path = normalise(match.path);

  return PREFERRED_SEGMENTS.reduce(
    (total, segment, index) =>
      path.includes(segment)
        ? total + PREFERRED_SEGMENTS.length - index
        : total,
    0
  );
}

export function resolveOtherField(
  index,
  aliases
) {
  const matches = contractMatches(
    index,
    aliases
  );

  if (!matches.length) {
    return undefined;
  }

  return [...matches].sort(
    (left, right) =>
      score(right) - score(left)
  )[0].value;
}
