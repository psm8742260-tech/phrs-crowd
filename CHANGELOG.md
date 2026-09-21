# PHRS Crowd - Changelog

All notable changes to this project will be documented in this file.

## [2026-09-21]
### Added
- Completed comprehensive **Testing Mode Audit** (100-Second Atomic Deep Scan).
- Verified all 37 Agent Rules across UI and Backend modules.
- Validated core functionalities: App Studio, Database Sync, SMS Gateway, and AI Master Studio.
- Confirmed security protocols: Admin Auth (`6606.ok`) and Proxy-Only API routing.
- Verified system stability via `lint` and `compile` verification tools.
- **Pin-point Integration:** Integrated Cloud Share DNS records with the Live Domain Router (`server.ts`, Line 2917).
- Enabled instant live activation for proxied DNS records.
- **Ultra Coding Update:** Linked real-time CPU/Memory metrics to the Scaling chart in `CloudRunTab.tsx` (Line 166-215).
- Replaced simulated data with actual telemetry from the server.
- **Pin-point Project Fix:** Corrected project count in Scaling legend to show all **5 projects** with their accurate names.
- **Ultra Layout Update:** Expanded "Most used resources" table to show all active projects without limits (`CloudRunTab.tsx`, Line 129).
- Optimized table width and spacing for improved mobile visibility.
- **DNA Report Integration:** Added a new "DNA Report" column showing real-time DNS/SSL status for each project (`CloudRunTab.tsx`, Line 121, 161).
- **Ultra Detail View:** Implemented a full Google Cloud Run style project detail page with "Observability", "Revision History", and "Networking (DNA)" tabs.
- **One-Touch Navigation:** Clicking any project in the Overview board now opens its complete DNA record and settings panel.
- **Domain Mapping UI Redesign:** Re-implemented the "Domain mappings" tab to exactly match provided screenshots, including a dedicated "Domain Activation Guide" with CNAME instructions, an optimized mapping form, and a refined data table with action menus.
- Optimized layout with Test, Refresh, and Redeploy action buttons as per user provided screenshots.
