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
  { label: 'Dashboard', href: '#/dashboard', icon: Home },
  { label: 'Documents', href: '#/documents', icon: FileText },
  { label: 'Messages', href: '#/messages', icon: MessageSquare },
  { label: 'Tasks', href: '#/tasks', icon: CheckSquare },
  { label: 'Approvals', href: '#/approvals', icon: ShieldCheck },
  { label: 'Activity', href: '#/activity', icon: Activity },
];

export default function ClientPortalLayout({ children }) {
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

            return (
              <a key={item.href} href={item.href}>
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>

        <button className="logout-button">
          <LogOut size={18} />
          Sign out
        </button>
      </aside>

      <main className="portal-main">{children}</main>
    </div>
  );
}
