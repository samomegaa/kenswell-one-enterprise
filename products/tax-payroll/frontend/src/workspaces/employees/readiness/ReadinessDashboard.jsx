import {
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import ReadinessCard
  from './ReadinessCard';

import MissingFieldList
  from './MissingFieldList';

import SectionStatusList
  from './SectionStatusList';

import DashboardSummary
  from './DashboardSummary';

export default function ReadinessDashboard({
  workspace,
  onSelectSection,
}) {
  const [selectedLevel, setSelectedLevel] =
    useState(null);

  const levels = Object.entries(
    workspace.readiness?.levels || {}
  );

  const selected = useMemo(
    () =>
      selectedLevel
        ? workspace.readiness.levels[
            selectedLevel
          ]
        : null,
    [workspace, selectedLevel]
  );

  return (
    <section
      className="readiness-dashboard"
      aria-label="Payroll readiness dashboard"
    >
      <header className="readiness-dashboard__header">
        <div>
          <p className="readiness-dashboard__eyebrow">
            Enterprise readiness
          </p>
          <h2>Payroll workspace readiness</h2>
        </div>

        <DashboardSummary
          workspace={workspace}
        />
      </header>

      <div className="readiness-dashboard__cards">
        {levels.map(([level, result]) => (
          <ReadinessCard
            key={level}
            level={level}
            result={result}
            onOpenMissing={(nextLevel) =>
              setSelectedLevel(nextLevel)
            }
          />
        ))}
      </div>

      {selected && (
        <div className="readiness-dashboard__missing">
          <header>
            <h3>
              Missing fields for {selectedLevel}
            </h3>
            <button
              type="button"
              onClick={() =>
                setSelectedLevel(null)
              }
            >
              Close
            </button>
          </header>

          <MissingFieldList
            fields={selected.missingFields}
            onSelectSection={onSelectSection}
          />
        </div>
      )}

      <SectionStatusList
        sections={
          workspace.readiness?.sections || []
        }
        onSelectSection={onSelectSection}
      />
    </section>
  );
}

ReadinessDashboard.propTypes = {
  workspace: PropTypes.object.isRequired,
  onSelectSection: PropTypes.func.isRequired,
};
