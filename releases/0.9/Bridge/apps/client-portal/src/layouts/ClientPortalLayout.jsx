import { clearSession } from '../api/authStore';

import {
  Activity,
  CheckSquare,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '#/dashboard', route: '/dashboard', icon: Home },
  { label: 'Documents', href: '#/documents', route: '/documents', icon: FileText },
  { label: 'Messages', href: '#/messages', route: '/messages', icon: MessageSquare },
  { label: 'Tasks', href: '#/tasks', route: '/tasks', icon: CheckSquare },
  { label: 'Approvals', href: '#/approvals', route: '/approvals', icon: ShieldCheck },
  { label: 'Activity', href: '#/activity', route: '/activity', icon: Activity },
];

export default function ClientPortalLayout({ children }) {
  const currentRoute = window.location.hash.replace('#', '') || '/dashboard';

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="brand-block">
          <div className="brand-mark">K</div>
          <div>
            <strong>Kenswell One</strong>
            <span>Client Portal</span>
          </div>
        </div>

        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentRoute === item.route;

            return (
              <a key={item.href} href={item.href} className={active ? 'active' : ''}>
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          className="logout-button"
          onClick={() => {
            clearSession();
            window.location.hash = '/login';
            window.location.reload();
          }}
        >
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="portal-main">{children}</main>
    </div>
  );
}
