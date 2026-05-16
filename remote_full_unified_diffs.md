# Full Unified Diffs — frontend (generated 16.05.2026 18:38)


## frontend/src/styles/login.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\login.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\login.css"
index 67332fb..e9a2f03 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\login.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\login.css"
@@ -23,7 +23,7 @@
 .login-page p {
   position: relative;
   z-index: 1;
-  color: #e6f7ff;
+  color: #ffffff;
 }
 
 .login-title {
@@ -31,11 +31,8 @@
   margin-bottom: 1.5rem;
 
   font-size: clamp(2rem, 5vw, 3rem);
-  color: #f4fbff;
 
-  text-shadow:
-    0 0 12px rgba(126, 231, 255, 0.35),
-    0 8px 28px rgba(0, 0, 0, 0.55);
+  text-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
 }
 
 .login-form {
@@ -54,86 +51,17 @@
   backdrop-filter: none;
 }
 
-/* BACK BUTTON */
-.back-button {
-  position: fixed;
-  top: 2rem;
-  left: 2rem;
-  z-index: 999;
-
-  width: fit-content;
-  padding: 0.55rem 1rem;
-
-  border: 1px solid transparent;
-  border-radius: 12px;
-
-  background: transparent;
-  color: #e6f7ff;
-
-  font-size: 1rem;
-  font-weight: 500;
-  font-family: "Inter", sans-serif;
-
-  cursor: pointer;
-
-  transition:
-    background 0.35s ease,
-    border-color 0.35s ease,
-    box-shadow 0.35s ease,
-    transform 0.25s ease,
-    color 0.35s ease;
-
-  backdrop-filter: blur(0px);
-  box-shadow: none;
-}
-
-.back-button:hover,
-.back-button:focus {
-  background: rgba(8, 90, 120, 0.22);
-  border-color: rgba(126, 231, 255, 0.55);
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 14px rgba(0, 255, 255, 0.3),
-    0 0 28px rgba(0, 180, 255, 0.22),
-    0 0 46px rgba(0, 120, 255, 0.14);
-
-  color: #f4fbff;
-  transform: translateY(-2px) scale(1.03);
-}
-
-.back-button:active {
-  transform: scale(0.97);
-}
-
-.back-button:focus-visible {
-  outline: 3px solid rgba(126, 231, 255, 0.75);
-  outline-offset: 4px;
-}
-
 /* LABELS */
 .login-form label {
   font-family: "Inter", sans-serif;
   font-size: 18px;
   font-weight: 500;
-  color: #f4fbff;
-}
 
-/* Form field wrapper to keep label+input together */
-.form-field {
-  display: flex;
-  flex-direction: column;
-  gap: 0.2rem;
-  width: 100%;
-  align-items: center;
-}
-
-.form-field + .form-field {
-  margin-top: 1rem;
+  color: #ffffff;
 }
 
 /* INPUTS */
-.login-form input:not([type="checkbox"]) {
+.login-form input {
   width: fit-content;
   min-width: 150px;
   max-width: 100%;
@@ -145,7 +73,7 @@
   outline: none;
 
   background: transparent;
-  color: #e6f7ff;
+  color: #ffffff;
 
   font-size: 1rem;
   text-align: center;
@@ -162,8 +90,8 @@
 }
 
 /* PLACEHOLDER */
-.login-form input:not([type="checkbox"])::placeholder {
-  color: rgba(230, 247, 255, 0.72);
+.login-form input::placeholder {
+  color: rgba(255, 255, 255, 0.72);
 
   text-align: center;
 
@@ -175,31 +103,14 @@
 }
 
 /* HOVER + FOCUS */
-.login-form input:not([type="checkbox"]):hover,
-.login-form input:not([type="checkbox"]):focus {
+.login-form input:hover,
+.login-form input:focus {
   width: fit-content;
 
   background: rgba(8, 90, 120, 0.22);
-  border-color: rgba(126, 231, 255, 0.55);
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 14px rgba(0, 255, 255, 0.3),
-    0 0 28px rgba(0, 180, 255, 0.22),
-    0 0 46px rgba(0, 120, 255, 0.14);
-
-  color: #f4fbff;
-  transform: translateY(-2px) scale(1.03);
-}
 
-/* Apply same hover/focus styling when hovering the label or the whole field
-   so moving between label and input doesn't toggle styles (prevents flicker) */
-.form-field:hover input,
-.form-field:focus-within input {
-  width: fit-content;
-
-  background: rgba(8, 90, 120, 0.22);
   border-color: rgba(126, 231, 255, 0.55);
+
   backdrop-filter: blur(10px);
 
   box-shadow:
@@ -207,74 +118,9 @@
     0 0 28px rgba(0, 180, 255, 0.22),
     0 0 46px rgba(0, 120, 255, 0.14);
 
-  color: #f4fbff;
   transform: translateY(-2px) scale(1.03);
 }
 
-/* REMEMBER LOGIN */
-.login-form label.remember-login {
-  width: fit-content;
-
-  display: inline-flex;
-  flex-direction: row;
-  align-items: center;
-  justify-content: flex-start;
-  gap: 0.1rem;
-
-  align-self: center;
-  margin-top: 0.35rem;
-  margin-left: 3.5rem;
-
-  font-family: "Inter", sans-serif;
-  font-size: 0.68rem;
-  font-weight: 400;
-  letter-spacing: 0;
-  line-height: 1;
-
-  color: rgba(230, 247, 255, 0.62);
-
-  cursor: pointer;
-  user-select: none;
-}
-
-.remember-login span {
-  font-size: inherit;
-  font-weight: inherit;
-  text-align: right;
-}
-
-.remember-login input[type="checkbox"] {
-  width: 12px;
-  height: 12px;
-
-  margin: 0;
-  padding: 0;
-
-  align-self: center;
-
-  cursor: pointer;
-  accent-color: #7ee7ff;
-
-  background: transparent;
-  border: none;
-  box-shadow: none;
-  transform: none;
-  transition: none;
-}
-
-.remember-login:hover,
-.remember-login:focus-within {
-  background: transparent;
-  box-shadow: none;
-}
-
-.remember-login input[type="checkbox"]:hover,
-.remember-login input[type="checkbox"]:focus {
-  background: transparent;
-  box-shadow: none;
-  transform: none;
-}
-
 /* BUTTON */
 .login-form button {
   width: fit-content;
@@ -285,7 +131,7 @@
   border-radius: 12px;
 
   background: transparent;
-  color: #e6f7ff;
+  color: #ffffff;
 
   font-size: 1rem;
   font-weight: 500;
@@ -306,7 +152,9 @@
 
 .login-form button:hover {
   background: rgba(8, 90, 120, 0.22);
+
   border-color: rgba(126, 231, 255, 0.55);
+
   backdrop-filter: blur(10px);
 
   box-shadow:
@@ -314,7 +162,6 @@
     0 0 28px rgba(0, 180, 255, 0.22),
     0 0 46px rgba(0, 120, 255, 0.14);
 
-  color: #f4fbff;
   transform: translateY(-2px) scale(1.03);
 }
 
@@ -346,7 +193,7 @@
   border-radius: 12px;
 
   background: transparent;
-  color: white;
+  color: #7ee7ff;
 
   font-weight: 600;
   text-decoration: none;
@@ -364,7 +211,9 @@
 
 .login-page a:hover {
   background: rgba(8, 90, 120, 0.22);
+
   border-color: rgba(126, 231, 255, 0.55);
+
   backdrop-filter: blur(10px);
 
   box-shadow:
@@ -372,21 +221,13 @@
     0 0 28px rgba(0, 180, 255, 0.22),
     0 0 46px rgba(0, 120, 255, 0.14);
 
-  color: #f4fbff;
+  color: #ffffff;
+
   transform: translateY(-2px) scale(1.03);
 
   text-decoration: none;
 }
 
-/* ACTIONS (Cancel / Login) */
-.login-actions {
-  display: flex;
-  gap: 0.75rem;
-  justify-content: center;
-  align-items: center;
-  margin-top: 1rem;
-}
-
 .login-page p {
   margin-top: 1.75rem;
 
@@ -397,6 +238,7 @@
   font-size: 1rem;
 }
 
+/* TABLET */
 @media (max-width: 1024px) {
   .login-page {
     background-image: url("./images/tablet/login-diver-tablet.png");
@@ -409,6 +251,7 @@
   }
 }
 
+/* TABLET QUER */
 @media (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) {
   .login-page {
     background-image: url("./images/tablet/login-diver-tablet.png");
@@ -420,6 +263,7 @@
   }
 }
 
+/* HANDY HOCHKANT */
 @media (max-width: 600px) {
   .login-page {
     background-image: url("./images/handy/login-diver-mobile.png");
@@ -446,6 +290,7 @@
   }
 }
 
+/* HANDY QUER */
 @media (max-height: 500px) and (orientation: landscape) {
   .login-page {
     background-image: url("./images/handy/login-diver-mobile.png");
@@ -473,70 +318,4 @@
 
     flex-direction: row;
   }
-}
-
-/* LOGIN ACTIONS */
-.login-actions {
-  display: flex;
-  justify-content: center;
-  align-items: center;
-
-  gap: 1.4rem;
-
-  flex-wrap: wrap;
-}
-
-/* LOGIN BUTTONS */
-.login-action-button {
-  width: fit-content;
-
-  padding: 0.55rem 1rem;
-
-  border: 1px solid transparent;
-  border-radius: 12px;
-
-  background: transparent;
-  color: #e6f7ff;
-
-  font-size: 1rem;
-  font-weight: 500;
-  font-family: "Inter", sans-serif;
-
-  cursor: pointer;
-
-  transition:
-    background 0.35s ease,
-    border-color 0.35s ease,
-    box-shadow 0.35s ease,
-    transform 0.25s ease,
-    color 0.35s ease;
-
-  backdrop-filter: blur(0px);
-  box-shadow: none;
-}
-
-.login-action-button:hover {
-  background: rgba(8, 90, 120, 0.22);
-
-  border-color: rgba(126, 231, 255, 0.55);
-
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 14px rgba(0, 255, 255, 0.3),
-    0 0 28px rgba(0, 180, 255, 0.22),
-    0 0 46px rgba(0, 120, 255, 0.14);
-
-  color: #f4fbff;
-
-  transform: translateY(-2px) scale(1.03);
-}
-
-.login-action-button:active {
-  transform: scale(0.97);
-}
-
-.login-action-button:focus-visible {
-  outline: 3px solid rgba(126, 231, 255, 0.75);
-  outline-offset: 4px;
-}
+}
\ No newline at end of file

---


## frontend/src/styles/register.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\register.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\register.css"
index 76d9c3c..53a3c61 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\register.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\register.css"
@@ -33,7 +33,7 @@
   display: flex;
   flex-direction: column;
   align-items: center;
-  gap: 0.2rem;
+  gap: 1rem;
 
   padding: 2rem;
   border-radius: 20px;
@@ -42,64 +42,6 @@
   backdrop-filter: none;
 }
 
-/* BACK BUTTON */
-.back-button {
-  position: fixed;
-  top: 2rem;
-  left: 2rem;
-  z-index: 999;
-
-  width: fit-content;
-  padding: 0.55rem 1rem;
-
-  border: 1px solid transparent;
-  border-radius: 12px;
-
-  background: transparent;
-  color: #ffffff;
-
-  font-size: 1rem;
-  font-weight: 500;
-  font-family: "Inter", sans-serif;
-
-  cursor: pointer;
-
-  transition:
-    background 0.35s ease,
-    border-color 0.35s ease,
-    box-shadow 0.35s ease,
-    transform 0.25s ease,
-    color 0.35s ease;
-
-  backdrop-filter: blur(0px);
-  box-shadow: none;
-}
-
-.back-button:hover,
-.back-button:focus {
-  background: rgba(8, 90, 120, 0.22);
-
-  border-color: rgba(126, 231, 255, 0.55);
-
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 14px rgba(0, 255, 255, 0.3),
-    0 0 28px rgba(0, 180, 255, 0.22),
-    0 0 46px rgba(0, 120, 255, 0.14);
-
-  transform: translateY(-2px) scale(1.03);
-}
-
-.back-button:active {
-  transform: scale(0.97);
-}
-
-.back-button:focus-visible {
-  outline: 3px solid rgba(126, 231, 255, 0.75);
-  outline-offset: 4px;
-}
-
 /* LABELS */
 .register-form label {
   font-family: "Inter", sans-serif;
@@ -109,15 +51,6 @@
   color: #ffffff;
 }
 
-/* Form field wrapper to keep label+input together */
-.form-field {
-  display: flex;
-  flex-direction: column;
-  gap: 0.125rem;
-  width: 100%;
-  align-items: center;
-}
-
 /* INPUTS + SELECTS */
 .register-form input,
 .register-form select {
@@ -143,10 +76,11 @@
   box-shadow: none;
 
   transition:
-    background 0.45s ease,
-    border-color 0.45s ease,
-    box-shadow 0.45s ease,
-    color 0.45s ease;
+    width 0.3s ease,
+    background 0.35s ease,
+    border-color 0.35s ease,
+    box-shadow 0.35s ease,
+    transform 0.25s ease;
 }
 
 /* PLACEHOLDER + SELECT TEXT */
@@ -168,24 +102,8 @@
 .register-form select:hover,
 .register-form input:focus,
 .register-form select:focus {
-  background: rgba(8, 90, 120, 0.22);
-
-  border-color: rgba(126, 231, 255, 0.55);
-
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 14px rgba(0, 255, 255, 0.3),
-    0 0 28px rgba(0, 180, 255, 0.22),
-    0 0 46px rgba(0, 120, 255, 0.14);
-}
+  width: fit-content;
 
-/* Apply same hover/focus styling when hovering the label or the whole field
-   so moving between label and input doesn't toggle styles (prevents flicker) */
-.form-field:hover input,
-.form-field:hover select,
-.form-field:focus-within input,
-.form-field:focus-within select {
   background: rgba(8, 90, 120, 0.22);
 
   border-color: rgba(126, 231, 255, 0.55);
@@ -196,6 +114,8 @@
     0 0 14px rgba(0, 255, 255, 0.3),
     0 0 28px rgba(0, 180, 255, 0.22),
     0 0 46px rgba(0, 120, 255, 0.14);
+
+  transform: translateY(-2px) scale(1.03);
 }
 
 /* DATE */
@@ -302,7 +222,7 @@
   border-radius: 12px;
 
   background: transparent;
-  color:white;
+  color: #7ee7ff;
 
   font-weight: 600;
   text-decoration: none;
@@ -422,120 +342,4 @@
     gap: 0.65rem;
     border-radius: 18px;
   }
-}
-
-/* GENDER INFO TOOLTIP */
-.gender-label-wrapper {
-  position: relative;
-
-  display: inline-flex;
-  align-items: flex-start;
-}
-
-.info-tooltip {
-  position: absolute;
-
-  top: -0.45rem;
-  right: -1.9rem;
-
-  display: flex;
-  align-items: center;
-  justify-content: center;
-}
-
-.info-icon {
-  display: flex;
-  align-items: center;
-  justify-content: center;
-
-  width: 18px;
-  height: 18px;
-
-  border-radius: 50%;
-
-  border: 1px solid transparent;
-
-  background: transparent;
-
-  color: #ffffff;
-
-  font-size: 0.72rem;
-  font-weight: 700;
-  font-family: "Inter", sans-serif;
-
-  cursor: pointer;
-
-  backdrop-filter: blur(0px);
-  box-shadow: none;
-
-  transition:
-    background 0.35s ease,
-    border-color 0.35s ease,
-    box-shadow 0.35s ease,
-    transform 0.25s ease,
-    color 0.35s ease;
-}
-
-.info-icon:hover {
-  background: rgba(8, 90, 120, 0.22);
-
-  border-color: rgba(126, 231, 255, 0.55);
-
-  backdrop-filter: blur(10px);
-
-  box-shadow:
-    0 0 10px rgba(0, 255, 255, 0.22),
-    0 0 20px rgba(0, 180, 255, 0.16),
-    0 0 34px rgba(0, 120, 255, 0.12);
-
-  transform: scale(1.08);
-}
-
-.tooltip-text {
-  position: absolute;
-
-  top: 2rem;
-  left: 50%;
-
-  transform: translateX(-50%);
-
-  width: max-content;
-  max-width: 280px;
-
-  padding: 0.75rem 0.9rem;
-
-  border-radius: 14px;
-
-  background: rgba(4, 22, 34, 1);
-
-  border: 1px solid rgba(126, 231, 255, 0.35);
-
-  backdrop-filter: none;
-
-  overflow: hidden;
-  
-
-  color: #dffbff;
-
-  font-size: 0.85rem;
-  text-align: center;
-  line-height: 1.4;
-
-  opacity: 0;
-  visibility: hidden;
-
-  z-index: 99999;
-
-  transition:
-    opacity 0.3s ease,
-    transform 0.3s ease;
-
-  pointer-events: none;
-}
-
-.info-tooltip:hover .tooltip-text {
-  opacity: 1;
-  visibility: visible;
-
-  transform: translateX(-50%) translateY(6px);
 }
\ No newline at end of file

---


## frontend/src/styles/landing.css

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\landing.css" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\landing.css"
index b3521b6..d137ed3 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\styles\\landing.css"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\styles\\landing.css"
@@ -24,7 +24,7 @@
 
   border-radius: 32px;
   background: transparent;
-  backdrop-filter: none;
+  backdrop-filter:none;
 }
 
 .landing-greeting {
@@ -39,27 +39,22 @@
   margin: 0.35rem 0 0;
   font-size: clamp(3.4rem, 9vw, 6.4rem);
   line-height: 0.9;
-  color: #f4fbff;
-  text-shadow:
-    0 0 12px rgba(126, 231, 255, 0.35),
-    0 8px 28px rgba(0, 0, 0, 0.55);
+  color: #ffffff;
+  text-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
 }
 
 .landing-fauna {
   display: block;
   margin-top: 0.7rem;
   font-size: clamp(1.4rem, 4vw, 2.5rem);
-  color: #7ee7ff;
-  text-shadow:
-    0 0 12px rgba(126, 231, 255, 0.45),
-    0 6px 20px rgba(0, 0, 0, 0.45);
+  color: #7dd3fc;
+  text-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
 }
 
 .landing-subtitle {
   margin: 1rem 0 2rem;
-  color: #e6f7ff;
+  color: #dff7ff;
   font-weight: 500;
-  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
 }
 
 .auth-container {
@@ -86,7 +81,7 @@
   border-radius: 12px;
 
   background: transparent;
-  color: #e6f7ff;
+  color: #ffffff;
 
   font-size: 1rem;
   font-weight: 500;
@@ -104,26 +99,23 @@
 
   backdrop-filter: blur(0px);
   box-shadow: none;
-
-  /* performance hints to avoid paint/layout jitter on hover */
-  will-change: box-shadow, background, color;
-  transform-origin: center;
-  transform: translateZ(0);
-  backface-visibility: hidden;
-  -webkit-font-smoothing: antialiased;
 }
 
 .auth-button:hover {
   background: rgba(8, 90, 120, 0.22);
+
   border-color: rgba(126, 231, 255, 0.55);
-  backdrop-filter: blur(8px);
+
+  backdrop-filter: blur(10px);
 
   box-shadow:
     0 0 14px rgba(0, 255, 255, 0.3),
     0 0 28px rgba(0, 180, 255, 0.22),
     0 0 46px rgba(0, 120, 255, 0.14);
 
-  color: #f4fbff;
+  color: #ffffff;
+
+  transform: translateY(-2px) scale(1.03);
 }
 
 .auth-button::after {
@@ -135,11 +127,11 @@
 }
 
 .auth-button:focus-visible {
-  /* avoid outline-induced layout shift; use box-shadow for focus indication */
-  outline: none;
-  box-shadow: 0 0 0 4px rgba(126, 231, 255, 0.25);
+  outline: 3px solid rgba(126, 231, 255, 0.75);
+  outline-offset: 4px;
 }
 
+/* Tablet hochkant + kleinere Laptops */
 @media (max-width: 1024px) {
   .landing-page {
     background-image: url("./images/tablet/landing-ocean-tablet.png");
@@ -153,6 +145,7 @@
   }
 }
 
+/* Tablet quer */
 @media (min-width: 768px) and (max-width: 1366px) and (orientation: landscape) {
   .landing-page {
     background-image: url("./images/tablet/landing-ocean-tablet.png");
@@ -168,6 +161,7 @@
   }
 }
 
+/* Handy hochkant */
 @media (max-width: 600px) {
   .landing-page {
     background-image: url("./images/handy/landing-ocean-mobile.png");
@@ -203,6 +197,7 @@
   }
 }
 
+/* Handy quer */
 @media (max-height: 500px) and (orientation: landscape) {
   .landing-page {
     background-image: url("./images/handy/landing-ocean-mobile.png");

---


## frontend/src/pages/LoginPage.tsx

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\LoginPage.tsx" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\LoginPage.tsx"
index b1ed29e..7b2311c 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\LoginPage.tsx"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\LoginPage.tsx"
@@ -1,4 +1,4 @@
-import { useEffect, useState, type FormEvent } from "react";
+import { useState, type FormEvent } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { authService } from "../services/authService";
 import "../styles/login.css";
@@ -6,81 +6,25 @@ import "../styles/login.css";
 function LoginPage() {
   const navigate = useNavigate();
 
-  const [username, setUsername] = useState("");
+  const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
 
-  const [rememberUsername, setRememberUsername] = useState(false);
-  const [rememberPassword, setRememberPassword] = useState(false);
-
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
 
-  useEffect(() => {
-    const storedUsername = localStorage.getItem(
-      "rememberedUsername"
-    );
-
-    const storedPassword = localStorage.getItem(
-      "rememberedPassword"
-    );
-
-    if (storedUsername) {
-      setUsername(storedUsername);
-      setRememberUsername(true);
-    }
-
-    if (storedPassword) {
-      setPassword(storedPassword);
-      setRememberPassword(true);
-    }
-  }, []);
-
-  function handleRememberLoginData() {
-    if (rememberUsername) {
-      localStorage.setItem(
-        "rememberedUsername",
-        username
-      );
-    } else {
-      localStorage.removeItem("rememberedUsername");
-      setUsername("");
-    }
-
-    if (rememberPassword) {
-      localStorage.setItem(
-        "rememberedPassword",
-        password
-      );
-    } else {
-      localStorage.removeItem("rememberedPassword");
-      setPassword("");
-    }
-  }
-
-  function handleCancel() {
-    handleRememberLoginData();
-    navigate("/");
-  }
-
-  async function handleSubmit(
-    event: FormEvent<HTMLFormElement>
-  ) {
+  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
     event.preventDefault();
 
     setErrorMessage("");
     setLoading(true);
 
     try {
-      await authService.login(username, password);
-
-      handleRememberLoginData();
+      await authService.login(email, password);
 
       navigate("/main");
     } catch (error) {
       const message =
-        error instanceof Error
-          ? error.message
-          : "Login failed";
+        error instanceof Error ? error.message : "Login failed";
 
       setErrorMessage(message);
     } finally {
@@ -90,114 +34,42 @@ function LoginPage() {
 
   return (
     <main className="login-page">
-      <button
-        className="back-button"
-        type="button"
-        onClick={handleCancel}
-      >
-        {`<< Back`}
-      </button>
-
       <h1 className="login-title">Login</h1>
 
-      <form
-        className="login-form"
-        onSubmit={handleSubmit}
-      >
-        <div className="form-field">
-          <label htmlFor="login-username">
-            Username
-          </label>
-
-          <input
-            id="login-username"
-            type="text"
-            value={username}
-            onChange={(event) =>
-              setUsername(event.target.value)
-            }
-            required
-            placeholder="Enter Username"
-          />
-
-          <label className="remember-login">
-            <span>Remember username</span>
-
-            <input
-              type="checkbox"
-              checked={rememberUsername}
-              onChange={(event) =>
-                setRememberUsername(
-                  event.target.checked
-                )
-              }
-            />
-          </label>
-        </div>
-
-        <div className="form-field">
-          <label htmlFor="login-password">
-            Password
-          </label>
-
-          <input
-            id="login-password"
-            type="password"
-            value={password}
-            onChange={(event) =>
-              setPassword(event.target.value)
-            }
-            required
-            placeholder="Enter Password"
-          />
-
-          <label className="remember-login">
-            <span>Remember password</span>
-
-            <input
-              type="checkbox"
-              checked={rememberPassword}
-              onChange={(event) =>
-                setRememberPassword(
-                  event.target.checked
-                )
-              }
-            />
-          </label>
-        </div>
-
-        <div className="login-actions">
-          <button
-            className="login-action-button"
-            type="button"
-            onClick={handleCancel}
-          >
-            Cancel
-          </button>
-
-          <button
-            className="login-action-button"
-            type="submit"
-            disabled={loading}
-          >
-            {loading
-              ? "Logging in..."
-              : "Login"}
-          </button>
-        </div>
+      <form className="login-form" onSubmit={handleSubmit}>
+        <label htmlFor="login-email">Email</label>
+
+        <input
+          id="login-email"
+          type="email"
+          value={email}
+          onChange={(event) => setEmail(event.target.value)}
+          required
+          placeholder="Enter Email"
+        />
+
+        <label htmlFor="login-password">Password</label>
+
+        <input
+          id="login-password"
+          type="password"
+          value={password}
+          onChange={(event) => setPassword(event.target.value)}
+          required
+          placeholder="Enter Password"
+        />
+
+        <button type="submit" disabled={loading}>
+          {loading ? "Logging in..." : "Login"}
+        </button>
       </form>
 
       {errorMessage ? (
-        <p className="auth-error">
-          {errorMessage}
-        </p>
+        <p className="auth-error">{errorMessage}</p>
       ) : null}
 
       <p>
-        No account yet?{" "}
-        <Link to="/register">
-          Create one
-        </Link>
+        No account yet? <Link to="/register">Create one</Link>
       </p>
     </main>
   );

---


## frontend/src/pages/RegisterPage.tsx

diff --git "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\RegisterPage.tsx" "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\RegisterPage.tsx"
index e7eca98..f90f135 100644
--- "a/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\frontend\\src\\pages\\RegisterPage.tsx"
+++ "b/C:\\DCI\\AbschlussProjekt-DCI-2026\\Abschlussprojekt-Simon-Brian-Jimmy\\remote_repo_today\\frontend\\src\\pages\\RegisterPage.tsx"
@@ -1,4 +1,4 @@
-import { useRef, useState, type FormEvent } from "react";
+import { useState, type FormEvent } from "react";
 import { Link, useNavigate } from "react-router-dom";
 import { authService } from "../services/authService";
 import "../styles/register.css";
@@ -11,9 +11,7 @@ function RegisterPage() {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [gender, setGender] = useState("");
-  const [birthDate, setBirthDate] = useState("");
-  const [birthDateInputType, setBirthDateInputType] = useState<"text" | "date">("text");
-  const birthDateInputRef = useRef<HTMLInputElement>(null);
+  const [birthDate, setBirthDate] = useState(""); // Format: YYYY-MM-DD
 
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
@@ -35,19 +33,13 @@ function RegisterPage() {
     setLoading(true);
 
     try {
-      await authService.register(
-        email,
-        password,
-        username,
-        gender,
-        birthDate
-      );
-
+      await authService.register(email, password, username, gender, birthDate);
+      // Falls Register bereits Token liefert, ist man ggf. schon eingeloggt.
+      // F├╝r sauberen Flow trotzdem auf Login weiterleiten:
       navigate("/login");
     } catch (error) {
       const message =
         error instanceof Error ? error.message : "Registration failed";
-
       setErrorMessage(message);
     } finally {
       setLoading(false);
@@ -56,129 +48,79 @@ function RegisterPage() {
 
   return (
     <main className="register-page">
-      <button
-        type="button"
-        className="back-button"
-        onClick={() => navigate("/")}
-      >
-        {`<< Back`}
-      </button>
-
       <h1 className="register-title">Registration</h1>
 
       <form className="register-form" onSubmit={handleSubmit}>
-        <div className="form-field">
-          <label htmlFor="register-username">Username</label>
-
-          <input
-            id="register-username"
-            type="text"
-            value={username}
-            onChange={(event) => setUsername(event.target.value)}
-            placeholder="Required field"
-            required
-          />
-        </div>
-
-        <div className="form-field">
-          <label htmlFor="register-email">Email</label>
-
-          <input
-            id="register-email"
-            type="email"
-            value={email}
-            onChange={(event) => setEmail(event.target.value)}
-            placeholder="Required field"
-            required
-          />
-        </div>
-
-        <div className="form-field">
-          <label htmlFor="register-password">Password</label>
-
-          <input
-            id="register-password"
-            type="password"
-            value={password}
-            onChange={(event) => setPassword(event.target.value)}
-            placeholder="Required field"
-            required
-            minLength={6}
-          />
-        </div>
-
-        <div className="form-field">
-          <label htmlFor="register-confirm-password">
-            Confirm Password
-          </label>
-
-          <input
-            id="register-confirm-password"
-            type="password"
-            value={confirmPassword}
-            onChange={(event) =>
-              setConfirmPassword(event.target.value)
-            }
-            placeholder="Required field"
-            minLength={6}
-            required
-          />
-        </div>
-
-        <div className="form-field">
-          <div className="gender-label-wrapper">
-            <label htmlFor="register-gender">Gender</label>
-
-            <div className="info-tooltip">
-              <span className="info-icon">i</span>
+        <label htmlFor="register-username">Username</label>
+        <input
+          id="register-username"
+          type="text"
+          value={username}
+          onChange={(event) => setUsername(event.target.value)}
+          placeholder="Required field"
+          required
+        />
+
+        <label htmlFor="register-email">Email</label>
+        <input
+          id="register-email"
+          type="email"
+          value={email}
+          onChange={(event) => setEmail(event.target.value)}
+          placeholder="Required field"
+          required
+        />
+
+        <label htmlFor="register-password">Password</label>
+        <input
+          id="register-password"
+          type="password"
+          value={password}
+          onChange={(event) => setPassword(event.target.value)}
+          placeholder="Required field"
+          required
+          minLength={6}
+        />
+        <label htmlFor="register-confirm-password">Confirm Password</label>
+        <input id="register-confirm-password"
+          type="password"
+          value={confirmPassword}
+          onChange={(event) => setConfirmPassword(event.target.value)}
+          placeholder="Required field"
+          minLength={6}
+          required
+        />
+
+        <label htmlFor="register-gender">Gender</label>
+        <select
+          id="register-gender"
+          value={gender}
+          onChange={(event) => setGender(event.target.value)}
+        >
+          <option value="">Optional</option>
+          <option value="female">Woman</option>
+          <option value="male">Man</option>
+          <option value="other">Others</option>
+        </select>
+
+        <label htmlFor="register-birthDate">Birth Date</label>
+        <input
+          id="register-birthDate"
+          type="date"
+          value={birthDate}
+          onChange={(event) => setBirthDate(event.target.value)}
+          placeholder="Optional"
+        />
+
+<div className="register-actions">
+  <button
+    className="register-action-button"
+    type="submit"
+    disabled={loading}
+  >
+    {loading ? "Registering..." : "Create account"}
+  </button>
 
-              <div className="tooltip-text">
-                Optional information such as gender and birth date can be updated later in your
-                profile settings.
-              </div>
-            </div>
-          </div>
-
-          <select
-            id="register-gender"
-            value={gender}
-            onChange={(event) => setGender(event.target.value)}
-          >
-            <option value="">Optional</option>
-            <option value="female">Woman</option>
-            <option value="male">Man</option>
-            <option value="other">Others</option>
-          </select>
-        </div>
-
-        <div className="form-field">
-          <label htmlFor="register-birthDate">
-            Birth Date
-          </label>
-
-          <input
-            ref={birthDateInputRef}
-            id="register-birthDate"
-            type={birthDateInputType}
-            value={birthDate}
-            onFocus={() => {
-              setBirthDateInputType("date");
-
-              setTimeout(() => {
-                birthDateInputRef.current?.showPicker?.();
-              }, 0);
-            }}
-            onBlur={() => {
-              if (!birthDate) {
-                setBirthDateInputType("text");
-              }
-            }}
-            onChange={(event) => setBirthDate(event.target.value)}
-            placeholder="Optional"
-          />
-        </div>
-
-        <div className="register-actions">
           <button
             className="register-action-button"
             type="button"
@@ -186,27 +128,17 @@ function RegisterPage() {
           >
             Cancel
           </button>
-
-          <button
-            className="register-action-button"
-            type="submit"
-            disabled={loading}
-          >
-            {loading ? "Registering..." : "Create account"}
-          </button>
         </div>
       </form>
 
-      {errorMessage ? (
-        <p className="auth-error">{errorMessage}</p>
-      ) : null}
+      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
 
       <p>
-        Already registered?{" "}
-        <Link to="/login">Go to login</Link>
+        Already registered? <Link to="/login">Go to login</Link>
       </p>
     </main>
   );
 }
 
-export default RegisterPage;
\ No newline at end of file
+export default RegisterPage;
+

---


