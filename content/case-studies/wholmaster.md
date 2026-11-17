# Gym software that never phones home

Whol Master

Whol Master is a gym management platform that runs on the front desk's own computer: members, subscriptions, payments, shop sales, reports and biometric entrance control, with an embedded database instead of a cloud account. One gym in Maracay has been running it for over a year.

**Year:** 2025

**Team:**

- Luis Alejandro Martínez

**Deliverables:**

- Electron desktop app
- Go REST API
- Admin UI in 5 languages
- Biometric entrance service

**Links:**

- [Website](https://wholmaster.com)

## The Problem

A gym was running its entire operation on a program written years earlier by **one person** who then disappeared. No updates, no support, nobody to ask when the thing that records payments breaks. The staff had adapted to it, but every month on that program was a month where a failure would have no fix.

The obvious answer, a cloud gym platform, is the wrong one for a lot of gyms. Those products bill monthly, meter members and stop working when the connection, the card or the vendor does. A front desk with a queue in front of it cannot depend on someone else's server. So the brief was simple to say and hard to build: software the gym **owns**, running **offline**, covering the same work the old program did, and surviving upgrades without losing a year of payment history.

## The Challenge

Offline-first changes the whole architecture. There is no server to hide behind and no tenant to isolate: the database is a single **SQLite file** on the machine that runs the front desk, so it has to be backed up, migrated and recovered as such. Schema changes ship inside the API binary and apply on startup, on a computer where nobody will ever type a command. A failed migration cannot leave a gym staring at an unusable machine, so every app update checkpoints the write-ahead log and copies the database aside before installing.

The entrance is the second hard part. **Fingerprint readers** come from vendors that each expose a different low-level driver, so the readers sit behind one C++ interface service that the rest of the app talks to over HTTP. A HID numpad bridge lets a scanner drive member lookup, and face recognition runs from the gym's own camera. Manual search by name or member ID always remains, because hardware fails and a queue does not wait.

Licensing had to work with no online check on every keystroke: keys that never expire, a short lease bound to the machine fingerprint, both **signed with Ed25519** and verified against a public key compiled into the backend. Nothing a user can edit grants entitlement, and an expired lease drops the install to evaluation instead of locking the gym out of its own records. Seven days of slack mean a week-long outage is invisible.

Around that sits the unglamorous part: an Electron app distributed for Windows, macOS and Linux with auto-update, an admin interface in **five languages** for staff who are not technical, PDF and CSV reports the accountant accepts, and a shop point of sale that shares the same database as the memberships.

## The Product

Whol Master is one desktop application made of cooperating processes: an **Electron** shell that boots a **Go REST API**, a **SvelteKit** admin interface served from the same install, and optional hardware services for the fingerprint interface and the numpad bridge. Data lives in embedded SQLite, so a backup is a file copy.

The modules cover the whole front desk: members and their documents, subscriptions and billing cycles, packages and services, payments with a quick renew action, a shop point of sale with stock, analytics with revenue, churn and cohort views, entrance logging with biometric matching, WhatsApp campaigns for birthdays and expiry reminders, and the reports exported to CSV and PDF. Optional Stripe autopay collects recurring dues into the gym's own Stripe account without Whol Master ever holding member money.

A first-run onboarding wizard walks a new gym through its basic data, branded colours, admin user, cycles, services and packages, so an install ends in a usable system rather than an empty database. The user manual is generated from the same codebase and ships inside the app, in Spanish and English, because the person installing this is a gym owner, not an IT department.

## The Results

**Bahia's Gym**, in Maracay, Venezuela, has been running Whol Master for more than a year. The abandoned program is gone, the payment history came across, and the front desk works when the internet does not. That is the result I care about most: a small business replaced software nobody could fix with software it owns.

| Metric | Value |
| ------------------------------ | ------------------------------------ |
| Days in daily use at one gym | 400+ |
| Fingerprint readers validated | 4 |
| Commits from first line to today | ~1.2K |
| Languages for front desk staff | 5 |

Every differentiator in the product has been exercised on real hardware and real data rather than demonstrated in a mock: four fingerprint readers paired and identified members, face recognition ran from a camera, the numpad bridge looked members up from a scanner, and the entrance log filled up one member at a time. The platform itself is around **1,200 commits** and fourteen releases over sixteen months, built end to end by one person: backend, admin UI, desktop shell, hardware services, licensing, manuals and release engineering.

The next step is the part that is not written in code: opening the platform to more gyms and repeating this with customers who are not the first one.

**Links:**

- [Website](https://wholmaster.com)
