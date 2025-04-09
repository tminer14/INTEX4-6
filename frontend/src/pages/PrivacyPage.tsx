import Header from "../components/Header";
import "../styles/PrivacyPage.css";

function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="privacy-policy">
        <h1>Privacy Policy</h1>

        <h2>1. Who We Are</h2>
        <p>
          Cineniche is a U.S.-based streaming service that provides movie
          recommendations. By using our website and creating an account, you
          agree to the terms of this Privacy Policy.
        </p>

        <h2>2. What Data We Collect</h2>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>IP address</li>
          <li>Cookies and usage data</li>
          <li>Viewing and interaction history</li>
          <li>Device and browser information</li>
          <li>Any information submitted through forms</li>
        </ul>

        <h2>3. How We Collect Your Data</h2>
        <p>We collect your data in two main ways:</p>
        <ul>
          <li>
            <strong>Directly from you:</strong> through account registration
            forms and other inputs on the site.
          </li>
          <li>
            <strong>Automatically:</strong> via cookies, web beacons, and
            similar tracking technologies.
          </li>
        </ul>

        <h2>4. Why We Collect Your Data</h2>
        <p>We collect your personal data for the following purpose:</p>
        <ul>
          <li>
            To provide personalized movie recommendations based on your
            preferences and behavior.
          </li>
        </ul>

        <h2>5. Legal Basis for Processing</h2>
        <p>Under the GDPR, we process your personal data on the basis of:</p>
        <ul>
          <li>Your consent (e.g., accepting cookies).</li>
          <li>
            Performance of a contract (e.g., providing services when you create
            an account).
          </li>
          <li>Legitimate interests (e.g., improving our services).</li>
        </ul>

        <h2>6. Data Sharing</h2>
        <p>
          We do not share your personal data with third parties for marketing or
          any other purposes.
        </p>

        <h2>7. Cookies and Tracking</h2>
        <p>
          We use cookies to enhance your experience and tailor recommendations.
          When you visit our site, a cookie banner allows you to accept or
          manage your preferences. For more information, please see our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <h2>8. Your Rights Under GDPR</h2>
        <p>If you are in the EU or UK, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Withdraw consent at any time.</li>
          <li>Object to or restrict certain types of processing.</li>
          <li>File a complaint with a supervisory authority.</li>
        </ul>
        <p>
          To make a request, please contact us at{" "}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>.
        </p>

        <h2>9. Data Retention</h2>
        <p>
          We retain your personal data only as long as you have an active
          account with us. If you delete your account, we will erase your
          personal data promptly, unless legal obligations require otherwise.
        </p>

        <h2>10. Children’s Privacy</h2>
        <p>
          Cineniche is not intended for users under the age of 13, and we do not
          knowingly collect personal data from children.
        </p>

        <h2>11. International Users</h2>
        <p>
          If you are accessing Cineniche from outside the United States, your
          information may be transferred to and stored in the U.S., where
          privacy laws may not be as protective as those in your jurisdiction.
        </p>

        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We encourage you
          to review it periodically. Changes are effective once posted on this
          page.
        </p>

        <h2>13. Contact Us</h2>
        <p>
          If you have questions or concerns about this policy or your data,
          please contact us at:
          <br />
          📧 <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
        </p>
      </div>
    </>
  );
}

export default PrivacyPage;
