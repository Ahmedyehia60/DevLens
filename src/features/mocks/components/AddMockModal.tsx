import React, { useState } from "react";
import styles from "./AddMockModal.module.css";
import { X, Sparkles, ChevronDown, Check } from "lucide-react";

type Protocol = "REST" | "GraphQL";

type AddMockModalProps = {
  onClose: () => void;
  onSave: (data: any) => void;
};

const REST_ROUTE_PLACEHOLDER = "/api/v1/users";
const GRAPHQL_ROUTE_PLACEHOLDER =
  "query GetUserById($id: ID!) | mutation CreateUser($input: UserInput!)";
const REST_AI_PLACEHOLDER =
  "Describe the REST endpoint and required mock data in plain English...";
const GRAPHQL_AI_PLACEHOLDER =
  "Describe the GraphQL operation, its arguments and required mock data in plain English...";

export default function AddMockModal({ onClose, onSave }: AddMockModalProps) {
  const [protocol, setProtocol] = useState<Protocol>("REST");
  const [restMethod, setRestMethod] = useState("GET");
  const [routePath, setRoutePath] = useState("/api/v1/");
  const [collection, setCollection] = useState(
    "Auth, Products, Checkout... (supports Parent/Child)",
  );
  const [aiPrompt, setAiPrompt] = useState("");
  const [responseBody, setResponseBody] = useState(
    '{\n  "message": "Hello from DevLens"\n}',
  );
  const [delay, setDelay] = useState(0);
  const [httpStatus, setHttpStatus] = useState("200 OK");
  const [stochastic, setStochastic] = useState(false);

  const isGraphQL = protocol === "GraphQL";
  const method = isGraphQL ? "POST" : restMethod;
  const routeLabel = isGraphQL ? "Operation Name or Signature" : "Route path";
  const routePlaceholder = isGraphQL
    ? GRAPHQL_ROUTE_PLACEHOLDER
    : REST_ROUTE_PLACEHOLDER;
  const aiPlaceholder = isGraphQL
    ? GRAPHQL_AI_PLACEHOLDER
    : REST_AI_PLACEHOLDER;

  const handleSaveClick = () => {
    onSave({
      protocol,
      method,
      routePath,
      collection,
      responseBody,
      delay,
      httpStatus,
      stochastic,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Configure Mock Endpoint</h2>
            <p>Define a new local mock response.</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formRow}>
            <div className={styles.fieldGroup}>
              <label>Protocol</label>
              <div className={styles.segmentedControl}>
                <button
                  type="button"
                  className={protocol === "REST" ? styles.activeSegment : ""}
                  onClick={() => setProtocol("REST")}
                >
                  REST
                </button>
                <button
                  type="button"
                  className={protocol === "GraphQL" ? styles.activeSegment : ""}
                  onClick={() => setProtocol("GraphQL")}
                >
                  GraphQL
                </button>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="mock-method">Method</label>
              <div
                className={`${styles.selectWrapper} ${
                  isGraphQL ? styles.selectDisabled : ""
                }`}
              >
                <select
                  id="mock-method"
                  value={method}
                  disabled={isGraphQL}
                  title={
                    isGraphQL
                      ? "GraphQL operations are always sent over HTTP POST"
                      : undefined
                  }
                  onChange={(e) => setRestMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>
            </div>

            <div className={`${styles.fieldGroup} ${styles.flexGrow}`}>
              <label htmlFor="mock-route">{routeLabel}</label>
              <input
                id="mock-route"
                type="text"
                placeholder={routePlaceholder}
                value={routePath}
                onChange={(e) => setRoutePath(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Collection / folder</label>
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
          </div>

          <div className={styles.aiBox}>
            <div className={styles.aiHeader}>
              <Sparkles size={14} className={styles.aiIcon} />
              <span>AI Schema Generator</span>
            </div>
            <div className={styles.aiInputRow}>
              <input
                type="text"
                placeholder={aiPlaceholder}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button type="button" className={styles.aiGenerateBtn}>
                <Sparkles size={13} />
                <span>Generate Schema</span>
              </button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Response body</label>
            <textarea
              className={styles.codeArea}
              rows={5}
              value={responseBody}
              onChange={(e) => setResponseBody(e.target.value)}
            />
          </div>

          <div className={styles.bottomSettings}>
            <div className={styles.fieldGroup}>
              <div className={styles.labelWithVal}>
                <label>Response Delay (ms)</label>
                <span className={styles.valIndicator}>{delay} ms</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className={styles.rangeSlider}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Forced HTTP status</label>
              <div className={styles.selectWrapper}>
                <select
                  value={httpStatus}
                  onChange={(e) => setHttpStatus(e.target.value)}
                >
                  <option value="200 OK">200 OK</option>
                  <option value="201 Created">201 Created</option>
                  <option value="400 Bad Request">400 Bad Request</option>
                  <option value="401 Unauthorized">401 Unauthorized</option>
                  <option value="500 Internal Error">500 Internal Error</option>
                </select>
                <ChevronDown size={14} className={styles.selectChevron} />
              </div>
            </div>
          </div>

          <div className={styles.stochasticBox}>
            <div>
              <span className={styles.stochTitle}>Stochastic Latency Mode</span>
              <p className={styles.stochDesc}>
                Replace the fixed delay with a probability distribution.
              </p>
            </div>
            <button
              type="button"
              className={`${styles.toggle} ${stochastic ? styles.toggleActive : ""}`}
              onClick={() => setStochastic(!stochastic)}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={handleSaveClick}
          >
            <Check size={14} />
            <span>Save Endpoint</span>
          </button>
        </div>
      </div>
    </div>
  );
}
