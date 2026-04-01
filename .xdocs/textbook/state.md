# HTTP State Management Mechanisms

HTTP is a stateless protocol, meaning it does not maintain state between requests. However, web applications often require maintaining state to manage user sessions, track user preferences, and personalize user experiences.

To address this, various state management mechanisms have been developed. This guide covers the most common client-side storage options and how to choose the right one for your use case, particularly for authentication.

## Client-Side Storage Mechanisms

| Storage Type | What It Is | Common Use Cases |
|-------------|------------|------------------|
| **Cookies** | Small data pieces (4KB) sent automatically with every request | Session tokens, user preferences, "remember me" |
| **Local Storage** | Key-value storage (5-10MB) that persists forever | Cached data, user settings, offline app data |
| **Session Storage** | Key-value storage (5-10MB) cleared when tab closes | Form data, temporary cart items, wizard progress |
| **IndexedDB** | Browser database (50MB+) for structured data | Large datasets, offline apps, file storage |

---

### 1. Cookies

Cookies are small pieces of data (typically 4KB max) stored in the user's web browser by the server. The browser automatically sends cookies with every request to the same domain, making them ideal for session management.

**General Use Cases:**

- User preferences and settings
- Shopping cart persistence
- Tracking and analytics
- Remember me functionality

**Authentication Use:**
Cookies are the most common method for storing session tokens. The server sets an HTTP-only cookie during login, and the browser automatically includes it in subsequent requests.

**Security Features:**

- `HttpOnly`: Prevents JavaScript access, protecting against XSS attacks
- `Secure`: Ensures transmission only over HTTPS
- `SameSite`: Protects against CSRF attacks (`Strict`, `Lax`, or `None`)

**Pros:**

- Automatic transmission with each request
- Strong built-in security options
- Works well with server-side session management

**Cons:**

- Limited storage size (~4KB per cookie)
- Vulnerable to CSRF if `SameSite` is not properly configured
- Restricted to same-origin by default

**Best for:** Session-based authentication, user preferences

---

### 2. Local Storage

Local storage provides a simple key-value storage interface accessible via JavaScript. It offers significantly more storage capacity (5-10MB per domain) and persists data indefinitely until explicitly cleared.

**General Use Cases:**

- Caching static assets
- User preferences and settings
- Offline data storage for PWAs
- Application state persistence

**Authentication Use:**
Can store JWT tokens or other authentication credentials, but requires manual inclusion in request headers.

**Pros:**

- Large storage capacity (5-10MB)
- Synchronous API, easy to use
- Persists across browser sessions

**Cons:**

- ⚠️ **Vulnerable to XSS attacks** - Any JavaScript can access it
- Not automatically sent with requests
- Synchronous operations can block UI thread
- No built-in expiration mechanism

**Best for:** Caching data, user preferences, offline storage (NOT recommended for sensitive auth tokens)

---

### 3. Session Storage

Session storage is similar to local storage but is automatically cleared when the browser tab/window is closed. It's scoped to a single tab/window.

**General Use Cases:**

- Multi-step form data
- Temporary shopping cart state
- Single-session user preferences
- Wizard/workflow progress
- Stateful demo mode - Mock data for development/prototyping (see [Zustand implementation](zustand.md))

**Authentication Use:**
Can store temporary session tokens that should not persist beyond the current browser session.

**Pros:**

- Automatically cleared when tab/window closes
- Larger capacity than cookies (5-10MB)
- Tab/window isolation prevents data leakage

**Cons:**

- Vulnerable to XSS attacks
- Not automatically sent with requests
- Lost when tab closes (may frustrate users)
- Not shared across tabs

**Best for:** Temporary, tab-specific data

💡 **Development Pattern:** For prototyping applications with interactive mock data, you can use Zustand's persist middleware with sessionStorage to create a stateful demo environment. See [zustand.md](zustand.md) for implementation details.

---

### 4. IndexedDB

IndexedDB is a low-level API for storing significant amounts of structured data, including files and blobs. It's an asynchronous, transactional database system built into the browser.

**General Use Cases:**

- Large dataset storage
- Offline-first applications
- Complex data querying
- File/blob storage
- Client-side caching for performance

**Authentication Use:**
Rarely used for authentication tokens due to complexity, but can store user profile data and permissions for offline access.

**Pros:**

- Large storage capacity (often 50MB+, up to available disk space)
- Asynchronous API (doesn't block UI)
- Supports indexes and complex queries
- Can store structured objects and files

**Cons:**

- Complex API with steep learning curve
- Requires more development effort
- Overkill for simple key-value storage

**Best for:** Large datasets, offline-first apps, complex data structures

---

## Choosing the Right Storage for Authentication

When implementing authentication, security should be your top priority. Here's a decision guide:

### **Recommended: HTTP-Only Cookies**

For most web applications, use HTTP-only cookies with proper security flags:

```http
Set-Cookie: session_token=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600
```

**Why?**

- Automatically sent with requests
- JavaScript cannot access them (XSS protection)
- `SameSite` provides CSRF protection
- Browser handles token transmission

### **Alternative: Bearer Tokens (JWT) in Authorization Headers**

For SPAs, mobile apps, or APIs, use JWT tokens stored in memory or sessionStorage and sent via the `Authorization` header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Why?**

- Stateless authentication (no server-side session storage)
- Works well for cross-origin requests
- Can contain user claims and permissions
- Suitable for microservices architecture

**Security Considerations:**

- Store in memory (most secure) or sessionStorage (persists in tab)
- NEVER store in localStorage (XSS risk)
- Always use HTTPS
- Implement token refresh mechanism
- Set short expiration times

### **Hybrid Approach (Best Security)**

Use HTTP-only cookies for refresh tokens + short-lived access tokens in memory:

1. Login returns HTTP-only cookie with refresh token
2. Client receives short-lived access token (5-15 min) in response body
3. Client stores access token in memory only
4. When access token expires, use cookie to get new access token
5. Refresh token rotates on each use

**Benefits:**

- Refresh token protected by HttpOnly flag
- Access token has minimal exposure window
- If access token is stolen, it expires quickly
- XSS cannot steal refresh token

---

## Security Best Practices

⛺️ **Key Principles:**

1. **Always use HTTPS** - Encryption prevents token interception
2. **Set appropriate expiration times** - Shorter is more secure
3. **Implement token rotation** - Refresh tokens should rotate after use
4. **Validate on every request** - Never trust client-side data
5. **Use HttpOnly cookies when possible** - Best XSS protection
6. **Enable SameSite cookies** - CSRF protection
7. **Never store sensitive tokens in localStorage** - XSS vulnerability
8. **Implement proper logout** - Clear all tokens/cookies
9. **Monitor for suspicious activity** - Detect token theft attempts
10. **Use CSRF tokens** - If not using SameSite cookies

---

## Quick Reference Table

| Storage Type | Size | Persistence | Auto-Sent | XSS Risk | CSRF Risk | Best For |
|-------------|------|-------------|-----------|----------|-----------|----------|
| **Cookies** | ~4KB | Configurable | ✅ Yes | ❌ No (HttpOnly) | ⚠️ Yes (without SameSite) | Session tokens |
| **Local Storage** | 5-10MB | Forever | ❌ No | ✅ Yes | ❌ No | Cache, preferences |
| **Session Storage** | 5-10MB | Tab session | ❌ No | ✅ Yes | ❌ No | Temporary data |
| **IndexedDB** | 50MB+ | Forever | ❌ No | ✅ Yes | ❌ No | Large datasets |

⛺️ **Note:** Session tokens are unique identifiers used to authenticate users. They can be session IDs (referencing server-side session data) or self-contained tokens like JWTs. The choice of storage mechanism depends on your security requirements, application architecture, and user experience needs.
