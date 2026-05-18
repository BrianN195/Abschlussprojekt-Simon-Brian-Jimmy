# Full Unified Diffs — frontend (generated 16.05.2026 18:38)


## frontend/src/styles/login.css

diff --git "a/C:\DCI\AbschlussProjekt-DCI-2026\Abschlussprojekt-Simon-Brian-Jimmy\frontend\src\styles\login.css" "b/C:\DCI\AbschlussProjekt-DCI-2026\Abschlussprojekt-Simon-Brian-Jimmy\remote_repo_today\frontend\src\styles\login.css"
index 67332fb..e9a2f03 100644
--- "a/C:\DCI\AbschlussProjekt-DCI-2026\Abschlussprojekt-Simon-Brian-Jimmy\frontend\src\styles\login.css"
+++ "b/C:\DCI\AbschlussProjekt-DCI-2026\Abschlussprojekt-Simon-Brian-Jimmy\remote_repo_today\frontend\src\styles\login.css"
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
-  color: #f4fbff;
-}
-
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
-
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
*** End Patch