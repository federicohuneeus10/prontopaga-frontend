# AI Interactions

Used Claude (claude.ai) as a development assistant throughout the project.

## Prompts used

1. "Dark fintech UI, slate palette (cards), no UI libraries. Login card with form, protected score view with result display. Needs to look production-grade — proper spacing, typography, subtle borders and shadows."

2. "Score gauge component: large numeric score, progress bar below it, risk label underneath. Color driven by thresholds — green ≥70, yellow ≥40, red <40. All derived from a single score value, no extra props."

3. "POST /auth/login returns a signed JWT with sub, role, and conditionally rut. Store token in React state after login, attach as Authorization: Bearer on subsequent calls to GET /score/:rut. What's the right fetch pattern for this flow in a small SPA without overcomplicating state management?"

4. "Backend returns 401 on failed login and 403 when a user role queries a RUT that doesn't match the one embedded in their token. Need to handle both separately in the same fetch handler and surface distinct, user-friendly error messages for each case."

5. "GET /score/:rut is protected by two chained middlewares — JWT verification then role-based authorization. From the frontend, handle token expiry (401) and unauthorized RUT access (403) with clear error states. Don't conflate the two."

6. "Logout button inside the protected view — resets token and score result to null, returns to login screen. Token lives in App-level state, not localStorage. Wire the button without adding unnecessary complexity."

7. "The API returns fecha as an ISO 8601 string. Format it to a human-readable Chilean locale datetime inside the score result card, no external date libraries."
