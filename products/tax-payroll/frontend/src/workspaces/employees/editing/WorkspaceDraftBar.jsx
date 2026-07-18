import PropTypes from 'prop-types';

export default function WorkspaceDraftBar({
  dirty,
  changedCount,
  editing,
  onEdit,
  onDiscard,
  onPrepareSave,
}) {
  return (
    <div className="workspace-draft-bar">
      <div>
        <strong>
          {dirty
            ? `${changedCount} unsaved change` +
              `${changedCount === 1 ? '' : 's'}`
            : editing
              ? 'Editing workspace'
              : 'Workspace is read-only'}
        </strong>
        <small>
          Changes remain local until submitted.
        </small>
      </div>

      <div className="workspace-draft-bar__actions">
        {!editing && (
          <button type="button" onClick={onEdit}>
            Edit employee
          </button>
        )}

        {editing && dirty && (
          <>
            <button
              type="button"
              onClick={onDiscard}
            >
              Discard changes
            </button>

            <button
              type="button"
              onClick={onPrepareSave}
            >
              Prepare save
            </button>
          </>
        )}
      </div>
    </div>
  );
}

WorkspaceDraftBar.propTypes = {
  dirty: PropTypes.bool.isRequired,
  changedCount: PropTypes.number.isRequired,
  editing: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onPrepareSave: PropTypes.func.isRequired,
};
