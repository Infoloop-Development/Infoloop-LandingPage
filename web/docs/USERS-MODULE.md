# CMS users, access, and first login

**Audience:** Infoloop admins  
**Where:** CMS → **Settings → Users**

---

## What you can do

1. **Create a user** with email + temporary password (Password field on create).
2. Choose **Full access** or **Limited**.
3. If limited: pick **categories** (Home, Services, Work, …). Optionally pick **individual** service / product / case study pages.
4. Leave **Must change password** ticked (default). On first login they must set a new password + confirm before seeing the CMS.
5. To reset later: open the user, set a new Password, leave **Must change password** ticked, save. Tell them the temporary password.

Only users with **Role = Admin** can open the Users collection.

---

## What limited users see

The admin nav only shows categories (and pages) they were granted. API update/delete is blocked for everything else. Media is available if they have any content category (or Media explicitly).

---

## First login flow

1. User logs in with email + temporary password.  
2. They are sent to **/admin/change-password**.  
3. They enter new password + confirm.  
4. Flag clears; they land on the dashboard with only their allowed areas.

---

## Notes

- Public site builds are unchanged (still public-read for published content).  
- After deploy, if new user fields are missing in the DB, run `npm run db:push` from `cms/` on a developer machine with `cms/.env` pointing at the database. (Setting `PAYLOAD_DATABASE_PUSH=true` on the Render service does nothing: the Postgres adapter only pushes outside `NODE_ENV=production`.)  
