# Dashboard Integration Patch

Add import to `apps/web/src/pages/Dashboard.jsx`:

```js
import { WorkflowWorkspacePage } from './WorkflowWorkspacePage.jsx';
```

Render below Mission Control or Customer 360 during Release 0.8 testing:

```jsx
<WorkflowWorkspacePage />
```
