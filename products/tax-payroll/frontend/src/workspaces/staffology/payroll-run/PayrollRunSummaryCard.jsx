import PropTypes from 'prop-types';
export default function PayrollRunSummaryCard({metric}) { return <article className="payroll-run-metric-card"><span>{metric.label}</span><strong>{metric.value}</strong></article>; }
PayrollRunSummaryCard.propTypes={metric:PropTypes.shape({label:PropTypes.string.isRequired,value:PropTypes.string.isRequired}).isRequired};
