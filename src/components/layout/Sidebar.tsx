import { useState } from "react";
import {
  Activity,
  Braces,
  ChevronLeft,
  Code2,
  Gauge,
  GitBranch,
  Globe,
  Radio,
  Settings,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { CollectionsTree } from "./CollectionsTree";
import styles from "./Sidebar.module.css";

const navigation = [
  { label: "API Mocks", path: "/mocks", icon: Zap },
  { label: "Network Logs", path: "/logs", icon: Activity, dot: true },
  { label: "AI Test Builder", path: "/ai-tester", icon: Sparkles },
  { label: "Scenarios", path: "/scenarios", icon: Terminal },
  { label: "Profiler", path: "/profiler", icon: Gauge },
  { label: "GraphQL IDE", path: "/graphql", icon: GitBranch },
  { label: "Network Chaos", path: "/chaos", icon: Gauge },
  { label: "Snippets", path: "/snippets", icon: Code2 },
  { label: "WebSocket", path: "/websocket", icon: Radio },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <Braces size={17} />
        </div>

        {!collapsed && <span>DevLens</span>}
      </div>

      {!collapsed && (
        <div className={styles.engine}>
          <span className={styles.engineDot} />
          <span>Local Engine: Online</span>
        </div>
      )}

      <nav className={styles.navigation}>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
            >
              <Icon size={17} strokeWidth={1.7} />

              {!collapsed && <span>{item.label}</span>}

              {!collapsed && item.dot && <span className={styles.navDot} />}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && (
        <>
          <div className={styles.collectionsHeader}>
            <span>COLLECTIONS</span>
          </div>

          <CollectionsTree />
        </>
      )}

      <div className={styles.footer}>
        <Globe size={14} />

        {!collapsed && <span>localhost:4000</span>}

        <button
          type="button"
          className={styles.collapseButton}
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft size={14} className={collapsed ? styles.rotate : ""} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
