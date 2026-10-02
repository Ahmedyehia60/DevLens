import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const NetworkLogsPage = lazy(() => import("../features/logs/NetworkLogsPage"));
const ApiMocksPage = lazy(() => import("../features/mocks/ApiMocksPage"));
const NetworkChaosPage = lazy(
  () => import("../features/chaos/NetworkChaosPage"),
);
const WebSocketPage = lazy(() => import("../features/websocket/WebSocketPage"));
const ScenariosPage = lazy(() => import("../features/scenarios/ScenariosPage"));
const GraphqlIdePage = lazy(() => import("../features/graphql/GraphqlIdePage"));
const ProfilerPage = lazy(() => import("../features/profiler/ProfilerPage"));
const AiTestBuilderPage = lazy(
  () => import("../features/ai-tester/AiTestBuilderPage"),
);
const SnippetsPage = lazy(() => import("../features/snippets/SnippetsPage"));
const SettingsPage = lazy(() => import("../features/settings/SettingsPage"));

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      color: "#94a3b8",
      fontSize: "14px",
    }}
  >
    Loading module...
  </div>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div
        className="app-layout-container"
        style={{ display: "flex", height: "100vh", overflow: "hidden" }}
      >
        <Sidebar />
        <div
          className="main-content-area"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Topbar />
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px",
              backgroundColor: "#0f172a",
            }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/mocks" replace />} />

                <Route path="/mocks" element={<ApiMocksPage />} />
                <Route path="/logs" element={<NetworkLogsPage />} />
                <Route path="/chaos" element={<NetworkChaosPage />} />
                <Route path="/websocket" element={<WebSocketPage />} />
                <Route path="/scenarios" element={<ScenariosPage />} />
                <Route path="/graphql" element={<GraphqlIdePage />} />
                <Route path="/profiler" element={<ProfilerPage />} />
                <Route path="/ai-tester" element={<AiTestBuilderPage />} />
                <Route path="/snippets" element={<SnippetsPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<Navigate to="/mocks" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
