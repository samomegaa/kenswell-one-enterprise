import { OrchestrationEvents } from '../index.js';

console.log('SLA_WARNING', OrchestrationEvents.SLA_WARNING);
console.log('SLA_BREACHED', OrchestrationEvents.SLA_BREACHED);
console.log('SLA_ESCALATED', OrchestrationEvents.SLA_ESCALATED);
console.log('DEADLINE_MONITORED', OrchestrationEvents.DEADLINE_MONITORED);
console.log('DEADLINE_MET', OrchestrationEvents.DEADLINE_MET);
