import React, { useState, useRef, useEffect } from "react";
import styles from "./Topbar.module.css";
import {
  Shield,
  Box,
  Share2,
  Globe,
  ChevronDown,
  Command,
  Check,
} from "lucide-react";

type TopbarProps = {
  contractGuard?: boolean;
  onContractGuardChange?: (value: boolean) => void;
  onImportPostman?: () => void;
  onShareSnapshot?: () => void;
  onVariablesClick?: () => void;
  selectedEnv?: string;
  onEnvChange?: (env: string) => void;
};

export default function Topbar({
  contractGuard = true,
  onContractGuardChange,
  onImportPostman,
  onShareSnapshot,
  onVariablesClick,
  selectedEnv = "Local",
  onEnvChange,
}: TopbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const environments = ["Local", "Staging", "Production Proxy"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.topbar}>
      <div className={styles.rightGroup}>
        <div className={styles.contractGuard}>
          <Shield size={14} className={styles.shieldIcon} />
          <span className={styles.contractText}>Contract Guard</span>

          <button
            type="button"
            className={`${styles.toggle} ${contractGuard ? styles.toggleActive : ""}`}
            onClick={() => onContractGuardChange?.(!contractGuard)}
            aria-label="Toggle Contract Guard"
          >
            <span className={styles.toggleKnob} />
          </button>
        </div>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={onImportPostman}
        >
          <Box size={14} className={styles.icon} />
          <span>Import Postman</span>
        </button>

        <button
          type="button"
          className={styles.toolbarButton}
          onClick={onShareSnapshot}
        >
          <Share2 size={14} className={styles.icon} />
          <span>Share Snapshot</span>
        </button>

        <div className={styles.environment} ref={dropdownRef}>
          <div
            className={styles.environmentSelector}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Globe size={13} className={styles.globe} />
            <span className={styles.selectValue}>{selectedEnv}</span>
            <ChevronDown
              size={11}
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            />
          </div>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              {environments.map((env) => {
                const isSelected = selectedEnv === env;
                return (
                  <div
                    key={env}
                    className={`${styles.dropdownItem} ${isSelected ? styles.selectedItem : ""}`}
                    onClick={() => {
                      onEnvChange?.(env);
                      setIsOpen(false);
                    }}
                  >
                    <span>{env}</span>
                    {isSelected && (
                      <Check size={14} className={styles.checkIcon} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <span className={styles.baseUrl}>http://localhost:4000</span>
        </div>
      </div>

      <button
        type="button"
        className={styles.variablesButton}
        onClick={onVariablesClick}
      >
        <Command size={14} className={styles.variablesIcon} />
        <span>Variables</span>
      </button>
    </header>
  );
}
