import CommandCentreHeader from
  './command-centre/CommandCentreHeader';

import CommandHistoryCard from
  './command-centre/CommandHistoryCard';

import PendingCommandsCard from
  './command-centre/PendingCommandsCard';

import SafeActionPanel from
  './command-centre/SafeActionPanel';

import {
  usePayrollCommand,
} from './command-centre';

export default function PayrollCommandCentre() {
  const command = usePayrollCommand();

  return (
    <section className="payroll-command-centre">
      <CommandCentreHeader />

      <SafeActionPanel
        commands={command.available}
        onRequest={command.request}
      />

      <div className="payroll-command-centre__grid">
        <PendingCommandsCard
          commands={command.commands}
          onApprove={command.approve}
          onReject={command.reject}
          onExecute={command.execute}
        />

        <CommandHistoryCard
          commands={command.commands}
        />
      </div>
    </section>
  );
}
