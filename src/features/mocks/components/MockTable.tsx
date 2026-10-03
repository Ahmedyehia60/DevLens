import React from "react";
import styles from "./MockTable.module.css";
import { Edit2, Play, Trash2 } from "lucide-react";

type Endpoint = {
  id: string;
  protocol: string;
  method: string;
  route: string;
  latency: string;
  errorRate: string;
};

type MockTableProps = {
  endpoints: Endpoint[];
};

export default function MockTable({ endpoints }: MockTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>PROTOCOL</th>
            <th>METHOD</th>
            <th>ROUTE / SIGNATURE</th>
            <th>LATENCY</th>
            <th>ERROR RATE</th>
            <th className={styles.actionsHeader}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {endpoints.map((item) => (
            <tr key={item.id}>
              <td className={styles.protocolCell}>{item.protocol}</td>
              <td>
                <span
                  className={`${styles.methodTag} ${styles[item.method.toLowerCase()]}`}
                >
                  {item.method}
                </span>
              </td>
              <td className={styles.routeCell}>{item.route}</td>
              <td className={styles.metricCell}>{item.latency}</td>
              <td className={styles.metricCell}>{item.errorRate}</td>
              <td className={styles.actionsCell}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  aria-label="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  type="button"
                  className={styles.actionBtn}
                  aria-label="Test"
                >
                  <Play size={14} />
                </button>
                <button
                  type="button"
                  className={`${styles.actionBtn} ${styles.deleteBtn}`}
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
