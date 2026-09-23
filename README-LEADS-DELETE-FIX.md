# Leads & Inquiries Delete Fix

This update fixes the Leads & Inquiries Manager Desk collection.

Previously, when the Firestore `leads` collection became empty, the real-time listener automatically recreated the demo leads. Therefore deleting the final lead appeared to fail.

The listener now uses the same one-time seed marker as bookings:
- demo leads are seeded only the first time the collection is initialized;
- after the manager deletes all leads, an empty Firestore collection remains empty;
- real-time updates continue to sync the empty state and all subsequent additions/edits/deletions across devices.

Replace the project with this package, push to GitHub, and wait for the GitHub Actions deployment to finish.
