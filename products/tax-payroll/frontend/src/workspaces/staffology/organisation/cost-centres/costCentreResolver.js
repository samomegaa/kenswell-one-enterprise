import { firstValue, resolveCollection } from '../organisationCollectionResolver';
import { COST_CENTRE_COLLECTION_PATHS, COST_CENTRE_FIELDS } from './costCentreFields';

export function resolveCostCentres(source) { return resolveCollection(source, COST_CENTRE_COLLECTION_PATHS); }
export function resolveCostCentreField(source, field) { return firstValue(source, COST_CENTRE_FIELDS[field] || []); }
