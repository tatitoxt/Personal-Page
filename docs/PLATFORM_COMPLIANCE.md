# Orkelya Autonomous Content Engine — Official Platform Compliance & Policy Guidelines

> **Last Updated:** 2026-08-07  
> **Core Principle:** Always use official APIs and OAuth 2.0 protocols. Zero unauthorized web scraping, zero anti-bot evasion, zero bypass of App Review or Rate Limits.

---

## Global Compliance Rules

### 1. Copyright & IP Respect
- **Original Asset Generation:** All videos, carousels, diagrams, code cards, and scripts are generated 100% originally using Orkelya's brand design system.
- **No Third-Party Reposting:** Zero downloading or re-uploading of third-party B-roll, videos, or visual assets without explicit licensing.
- **Audio & Music:** Only royalty-free audio or platform-native commercial audio libraries are utilized.
- **Voice Synthesis:** Synthetic voices (ElevenLabs) are strictly restricted to Orkelya's owned brand voice persona; zero cloning of real human voices without consent.

### 2. AI Content Transparency & Truthfulness
- **No Fake Social Proof:** Zero fake client testimonials, zero fabricated revenue figures, zero fake reviews or fake engagement metrics.
- **Clear Demo Disclaimers:** Any synthetic UI workflow or simulated conversation (e.g. Playwright WhatsApp/CRM demo) must be explicitly labeled as `DEMO`, `SIMULATION`, `EXAMPLE`, or `PROTOTYPE`.

### 3. Data Privacy & Secret Protection
- **Zero PII Exposure:** Automatic regex scanning (`SecurityQA`) blocks publishing if real human email addresses, phone numbers, or customer names appear.
- **Zero Secret Exposure:** Automatic regex scanner blocks publishing if API keys (`sk-...`, `ghp_...`, `whsec_...`) or private repository tokens appear in code snippets or UI demos.

### 4. Autonomous Publishing Failsafe Rule
If **ANY** of the following conditions trigger during the automated QA pass:
- Unverified factual claim or statistical assertion
- Policy / Platform compliance uncertainty
- Detected API key, secret token, or real PII
- Render corruption or missing media asset
- Duplicate post hash detection
- QA Overall Score < 85/100

**AUTOMATIC ACTION:** `DO NOT PUBLISH`.  
Set job status to `FAILED_QA` or `HUMAN_REVIEW_REQUIRED` and write the exact failure cause to the audit log.

---

## Official Platform API Specifications

### 1. Meta / Instagram Graph API
- **Publishing Endpoints:**
  - Container Creation: `POST /v19.0/{ig-user-id}/media`
  - Container Publish: `POST /v19.0/{ig-user-id}/media_publish`
- **Authentication:** Meta Business OAuth 2.0 (Long-lived User Access Token / Page Access Token).
- **Required Scopes & Permissions:**
  - `instagram_basic`
  - `instagram_content_publish`
  - `instagram_manage_insights`
  - `pages_read_engagement`
- **App Review:** Requires Meta App Review for `instagram_content_publish`.
- **Media Specs:**
  - Short-form Video (Reels): 9:16 aspect ratio (`1080x1920`), MOV/MP4, H.264, max 100MB, 3s–90s duration.
  - Carousels: 2–10 images/videos, 4:5 aspect ratio (`1080x1350`) or 1:1 (`1080x1080`).
- **Rate Limits:** 25 API-published posts per 24-hour rolling window per Instagram account.

---

### 2. LinkedIn Share & Media API
- **Publishing Endpoints:**
  - Media Upload Registration: `POST /v2/assets?action=registerUpload`
  - Post Share Creation: `POST /v2/ugcPosts` or Restli `/rest/posts`
- **Authentication:** OAuth 2.0 3-legged user authorization.
- **Required Scopes:**
  - `w_member_social` (Personal profile share)
  - `w_organization_social` (Company Page share)
  - `r_organization_social` (Company Page analytics)
- **App Review:** Requires LinkedIn Developer App Approval for Organization Page management.
- **Media Specs:**
  - Document / Carousel: PDF upload (`1080x1350` or `1080x1080`), max 100MB, up to 300 pages.
  - Video: MP4, 16:9 or 1:1 or 9:16, max 200MB, 3s–30min duration.
- **Rate Limits:** 100 posts per day per organization page.

---

### 3. TikTok Content Posting API
- **Publishing Endpoints:**
  - Direct Post Initialize: `POST /v2/post/publish/video/init/`
  - Video Upload: `POST /v2/post/publish/inbox/video/init/`
- **Authentication:** OAuth 2.0 User Access Token.
- **Required Scopes:**
  - `user.info.basic`
  - `video.upload`
  - `video.publish`
- **App Review:** Requires TikTok Developer App Audit & Partner Approval.
- **Media Specs:**
  - Video: 9:16 vertical (`1080x1920`), MP4/MOV, H.264, max 500MB, 3s–10min.
- **Rate Limits:** Enforced per user token based on developer tier.

---

### 4. YouTube Data API v3 (Shorts & Videos)
- **Publishing Endpoints:**
  - Video Upload: `POST /upload/youtube/v3/videos?uploadType=resumable`
- **Authentication:** OAuth 2.0 (Google Cloud Console).
- **Required Scopes:**
  - `https://www.googleapis.com/auth/youtube.upload`
  - `https://www.googleapis.com/auth/youtube.readonly`
- **App Review:** Requires Google Cloud OAuth API Verification for production quota elevation.
- **Media Specs:**
  - YouTube Shorts: Vertical 9:16 (`1080x1920`), <= 60 seconds duration, `#Shorts` in title/description.
- **Rate Limits:** Quota cost: 1,600 units per video upload out of 10,000 default daily quota (~6 uploads/day).

---

### 5. X (Twitter) API v2
- **Publishing Endpoints:**
  - Media Upload (v1.1): `POST https://upload.twitter.com/1.1/media/upload.json`
  - Tweet Creation (v2): `POST /2/tweets`
- **Authentication:** OAuth 2.0 User Context or OAuth 1.0a.
- **Required Scopes:**
  - `tweet.read`
  - `tweet.write`
  - `users.read`
  - `offline.access`
- **App Review:** Requires X Developer Portal App Review (Basic or Pro tier).
- **Media Specs:**
  - Single Image / Code Card: PNG/JPG/WebP, max 5MB.
  - Video: MP4, max 512MB, up to 2m20s.
- **Rate Limits:** Basic tier: 100 tweets / 24 hours per user.

---

### 6. Threads API (Meta)
- **Publishing Endpoints:**
  - Media Container: `POST /v1.0/{threads-user-id}/threads`
  - Post Publish: `POST /v1.0/{threads-user-id}/threads_publish`
- **Authentication:** OAuth 2.0 (Meta for Developers).
- **Required Scopes:**
  - `threads_basic`
  - `threads_content_publish`
  - `threads_read_replies`
- **App Review:** Requires Meta App Review for `threads_content_publish`.
- **Rate Limits:** 250 published posts per 24-hour period per user.
