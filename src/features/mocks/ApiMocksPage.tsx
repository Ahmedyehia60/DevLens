import React, { useState } from "react";
import styles from "./ApiMocksPage.module.css";
import { Upload, Plus, Radio } from "lucide-react";
import MockTable from "./components/MockTable";
import AddMockModal from "./components/AddMockModal";

export default function ApiMocksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [endpoints, setEndpoints] = useState([
    {
      id: "1",
      protocol: "REST",
      method: "GET",
      route: "/api/v1/users",
      latency: "120 ms",
      errorRate: "0%",
    },
    {
      id: "2",
      protocol: "REST",
      method: "POST",
      route: "/api/v1/auth/login",
      latency: "350 ms",
      errorRate: "0%",
    },
    {
      id: "3",
      protocol: "REST",
      method: "GET",
      route: "/api/v1/products",
      latency: "680 ms",
      errorRate: "0%",
    },
    {
      id: "4",
      protocol: "GraphQL",
      method: "GRAPHQL",
      route: "GetUserData",
      latency: "80 ms",
      errorRate: "0%",
    },
    {
      id: "5",
      protocol: "REST",
      method: "POST",
      route: "/api/v1/checkout",
      latency: "420 ms",
      errorRate: "0%",
    },
  ]);

  const handleAddEndpoint = (newMock: any) => {
    setEndpoints((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        protocol: newMock.protocol,
        method: newMock.method,
        route: newMock.routePath,
        latency: `${newMock.delay} ms`,
        errorRate: "0%",
      },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>API Endpoints & Mocks</h1>
            <span className={styles.badge}>
              {endpoints.length} active mocks
            </span>
          </div>

          <div className={styles.actionsGroup}>
            <button type="button" className={styles.secondaryButton}>
              <Upload size={14} />
              <span>Import JSON</span>
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={14} />
              <span>New Endpoint</span>
            </button>
          </div>
        </div>

        <MockTable endpoints={endpoints} />
      </div>

      <div className={styles.footerBar}>
        <Radio size={14} className={styles.pulseIcon} />
        <span>
          Serving mocks at{" "}
          <strong>
            https://id-preview--e6f1647b-9559-47f7-9436-9a5aa83dc823.lovable.app/api/public/mock
          </strong>
        </span>
      </div>

      {isModalOpen && (
        <AddMockModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddEndpoint}
        />
      )}
    </div>
  );
}
