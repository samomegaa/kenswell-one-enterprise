import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import StaffologyWorkspaceState
  from '../StaffologyWorkspaceState';

import AttachmentOrderTable
  from './AttachmentOrderTable';

import {
  presentModel,
} from './presentation';

export default function StaffologyAttachmentOrdersPanel({
  model,
}) {
  const presentation = presentModel(model);

  let content;

  if (!presentation.available) {
    content = (
      <StaffologyWorkspaceState
        title="Attachment orders unavailable"
        message={
          'Attachment order information is not present in the current Staffology employee response.'
        }
      />
    );
  } else if (!presentation.items.length) {
    content = (
      <StaffologyWorkspaceState
        title="No attachment orders"
        message="No attachment orders are recorded."
        tone="information"
      />
    );
  } else {
    content = (
      <AttachmentOrderTable
        items={presentation.items}
      />
    );
  }

  return (
    <WorkspaceSection
      title="Attachment Orders"
      description={
        'Read-only attachment order information supplied by Staffology.'
      }
    >
      {content}
    </WorkspaceSection>
  );
}

StaffologyAttachmentOrdersPanel.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
