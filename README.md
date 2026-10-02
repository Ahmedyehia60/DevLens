# DevLens

### Next-Gen Developer Toolkit & Network Simulation Suite

---

### Abstract

DevLens is an enterprise-grade developer workspace engineered to simulate network layers, intercept traffic, and test API integrations locally. Built with a strict feature-based modularity and atomic separation of concerns, it provides a robust, scalable sandbox for modern frontend diagnostics and debugging.

---

### Core Modules & Capabilities

- **Network Interceptor & Logs:** Real-time inspection, filtering, and deep payload analysis of HTTP/HTTPS traffic.
- **API Mocks Engine:** Decouple frontend from backend by mocking REST endpoints with custom payloads and status codes.
- **Chaos Engineering Suite:** Simulate unstable production networks via latency injection and failure rates.
- **WebSocket Inspector:** Live frame monitoring, connection lifecycle management, and message broadcasting.
- **Scenario Replay Engine:** Record and replay complex multi-step user workflows for integration testing.
- **GraphQL IDE:** Dedicated playground for executing queries, mutations, and exploring schemas.
- **Performance Profiler:** Monitor payload sizes, request durations, and rendering performance metrics.
- **AI Test Builder:** Generate automated test assertions and mock scenarios using intelligent prompts.

---

### Technical Specification & Stack

- **Core Runtime:** React 19, TypeScript, Vite
- **Styling Strategy:** CSS Modules (Enforcing strict component-level style encapsulation and zero global namespace pollution)
- **Architecture Pattern:** Feature-Based Modular Architecture (`/features`, `/services`, `/components`)
- **State & Persistence:** React Router DOM, Context API, and LocalStorage caching layers

---

### Getting Started

#### 1. Prerequisites

- **Node.js:** v18 or v20+
- **Package Manager:** npm or yarn

#### 2. Setup & Installation

```bash
# Clone the repository
git clone [https://github.com/Ahmedyehia60/DevLens.git](https://github.com/Ahmedyehia60/DevLens.git)

# Navigate into the project directory
cd DevLens

# Install dependencies
npm install
```
