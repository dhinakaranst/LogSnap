## LogShift

LogShift is a lightweight log monitoring and anomaly detection system designed to help developers quickly identify abnormal behavior in application logs.

### 🔍 What LogShift Does
- Ingests application logs via API
- Groups similar logs using message normalization
- Detects abnormal spikes based on frequency thresholds
- Surfaces anomalies with severity levels
- Provides a clear explanation of what happened and why it was flagged

### ⚙️ How Anomaly Detection Works
LogShift uses rule-based detection to identify anomalies.  
When a group of similar log messages exceeds a predefined frequency within a short time window, it is flagged as an anomaly.  
Each anomaly includes severity, spike count, detection time, and related logs.

### 🧪 How to Test Locally
1. Start the server
   ```bash
   npm run dev
