import PropTypes from 'prop-types';
import {
  presentEnterpriseHealth,
} from './healthPresentation';

export default function EnterpriseHealthCard({ health }) {
  const presentation = presentEnterpriseHealth(health);

  return (
    <article className="enterprise-health-card">
      <span>Enterprise health index</span>
      <strong>{presentation.scoreLabel}</strong>
      <h3>{presentation.label}</h3>
      <p>{presentation.summary}</p>
    </article>
  );
}

EnterpriseHealthCard.propTypes = {
  health: PropTypes.object.isRequired,
};
