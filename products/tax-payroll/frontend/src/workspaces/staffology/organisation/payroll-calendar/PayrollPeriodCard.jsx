import PropTypes from 'prop-types';

import OrganisationField
  from '../OrganisationField';

export default function PayrollPeriodCard({
  period,
}) {
  return (
    <article className="organisation-collection-card payroll-period-card">
      <h3>{period.title}</h3>

      <dl className="organisation-field-grid">
        {period.fields.map((field) => (
          <OrganisationField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </dl>
    </article>
  );
}

PayrollPeriodCard.propTypes = {
  period: PropTypes.shape({
    title: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
  }).isRequired,
};
