import { contractMatches } from '../../staffologyContractResolver';

const PREFERRED = [
  'taxandni',
  'taxni',
  'taxdetails',
  'nidetails',
  'employmentdetails',
  'payoptions',
];

function normalise(value) {
  return String(value).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function score(match) {
  const path = normalise(match.path);
  return PREFERRED.reduce(
    (total, segment, index) =>
      path.includes(segment) ? total + PREFERRED.length - index : total,
    0
  );
}

export function resolveTaxNiField(index, aliases) {
  const matches = contractMatches(index, aliases);
  if (!matches.length) return undefined;
  return [...matches].sort((a, b) => score(b) - score(a))[0].value;
}
