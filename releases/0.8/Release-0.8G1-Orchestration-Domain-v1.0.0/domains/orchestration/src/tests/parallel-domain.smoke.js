import { createParallelGroup } from '../index.js';

const group = createParallelGroup({
  key: 'parallel_preparation',
  name: 'Parallel Preparation',
  stepKeys: ['prepare_accounts', 'notify_client'],
  joinStepKey: 'director_approval'
});

console.log('GROUP', group.name);
console.log('STEPS', group.stepKeys.length);
console.log('JOIN', group.joinStepKey);
console.log('REQUIRED', group.requiredCompletions);
