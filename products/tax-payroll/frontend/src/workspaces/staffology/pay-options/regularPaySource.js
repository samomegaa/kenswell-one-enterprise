import {
  asRecord,
} from '../staffologyValueResolver';

export function regularPaySource(
  runtimeWorkspace
) {
  const workspace = asRecord(
    runtimeWorkspace?.workspace
  );

  return asRecord(
    workspace.employee ||
    workspace.canonicalEmployee ||
    workspace.data?.employee ||
    workspace.data ||
    runtimeWorkspace?.employee
  );
}
