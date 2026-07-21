import {
  contractMatches,
} from '../staffologyContractResolver';

const PREFERRED_SEGMENTS = Object.freeze([
  'regularpay',
  'payoptions',
  'payoption',
  'paydetails',
  'paymentdetails',
  'employmentdetails',
]);

function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function preferenceScore(match) {
  const path = normalise(match.path);

  return PREFERRED_SEGMENTS.reduce(
    (score, segment, index) =>
      path.includes(segment)
        ? score + PREFERRED_SEGMENTS.length - index
        : score,
    0
  );
}

export function resolveRegularPayField(
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

  const ranked = [...matches].sort(
    (left, right) =>
      preferenceScore(right) -
      preferenceScore(left)
  );

  return ranked[0].value;
}
