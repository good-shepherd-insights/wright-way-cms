// Inverted brand treatment for the login screen only — real Wright Way
// green (#35ba57) fills the page, white logo, and the primary button goes
// black, matching the same black-pill-on-green pattern the site's own
// navbar uses (e.g. "BOOK US NOW"). Scoped to `.login` so nothing else in
// the admin is affected.
export default function LoginAccent() {
  return (
    <style>{`
      .login {
        background: #35ba57;
      }
      .login .btn--style-primary {
        background: #000;
      }
      .login .btn--style-primary:hover {
        background: #1a1a1a;
      }
      .login .field-label {
        color: #fff;
      }
      .login a[href="/admin/forgot"] {
        color: #fff;
      }
      /* Real bug in dark mode: Payload's own dark-theme input/button
         styles are near-black on near-black here, unreadable. Force the
         real fields visible regardless of theme. */
      .login input[type="email"],
      .login input[type="password"] {
        background: #fff;
        color: #000;
      }
      .login .btn--style-primary .btn__label {
        color: #fff;
      }
    `}</style>
  )
}
