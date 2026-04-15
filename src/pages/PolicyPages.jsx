// src/pages/PolicyPages.jsx
import { Link } from 'react-router-dom';

const pageStyle = {
  maxWidth: 760,
  margin: '0 auto',
  padding: '48px 24px 80px',
};

const headingStyle = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(26px, 4vw, 36px)',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: 8,
};

const dateStyle = {
  fontSize: 13,
  color: '#888',
  marginBottom: 40,
  paddingBottom: 24,
  borderBottom: '1px solid #e5e5e5',
};

const sectionTitleStyle = {
  fontSize: 16,
  fontWeight: 700,
  color: '#1a1a1a',
  marginTop: 32,
  marginBottom: 10,
};

const paraStyle = {
  fontSize: 14.5,
  color: '#444',
  lineHeight: 1.8,
  marginBottom: 12,
};

const listStyle = {
  fontSize: 14.5,
  color: '#444',
  lineHeight: 1.8,
  paddingLeft: 20,
  marginBottom: 12,
};

const badgeStyle = {
  display: 'inline-block',
  background: '#1a1a1a',
  color: '#fff',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  padding: '4px 12px',
  borderRadius: 2,
  marginBottom: 20,
};

// ── TERMS OF SERVICE ──
export function TermsOfService() {
  return (
    <div style={pageStyle}>
      <div style={badgeStyle}>Legal</div>
      <h1 style={headingStyle}>Terms of Service</h1>
      <p style={dateStyle}>Last Updated: April 7, 2026</p>

      <p style={paraStyle}>
        Welcome to VJ-3D-WORKS ("we", "our", "us"). By accessing or using our website
        (<a href="https://vj3d-frontend.vercel.app/" style={{ color: '#2563eb' }}>https://vj3d-frontend.vercel.app/</a>),
        you agree to be bound by these Terms of Service.
      </p>

      <h2 style={sectionTitleStyle}>1. Use of Services</h2>
      <p style={paraStyle}>You agree to use our services only for lawful purposes. You must not:</p>
      <ul style={listStyle}>
        <li>Violate any applicable laws or regulations</li>
        <li>Attempt to interfere with or disrupt our services</li>
        <li>Use the platform for fraudulent transactions</li>
      </ul>

      <h2 style={sectionTitleStyle}>2. Services Offered</h2>
      <p style={paraStyle}>VJ-3D-WORKS provides both digital 3D services and physical 3D printing services.</p>
      <ul style={listStyle}>
        <li>Digital services include 3D design, modeling, and related work delivered online</li>
        <li>Physical products are created through 3D printing and delivered via third-party delivery partners</li>
      </ul>

      <h2 style={sectionTitleStyle}>3. User Accounts</h2>
      <p style={paraStyle}>If you create an account:</p>
      <ul style={listStyle}>
        <li>You are responsible for maintaining confidentiality</li>
        <li>You agree to provide accurate information</li>
        <li>You are responsible for all activities under your account</li>
      </ul>

      <h2 style={sectionTitleStyle}>4. Payments</h2>
      <ul style={listStyle}>
        <li>All payments made on our platform are processed securely via third-party payment gateways</li>
        <li>By making a payment, you agree to provide accurate billing information</li>
        <li>We are not responsible for payment failures due to incorrect details or network issues</li>
      </ul>

      <h2 style={sectionTitleStyle}>5. Pricing</h2>
      <ul style={listStyle}>
        <li>All prices are listed in INR</li>
        <li>We reserve the right to change pricing at any time without prior notice</li>
      </ul>

      <h2 style={sectionTitleStyle}>6. No Refund Policy</h2>
      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '16px 20px', marginBottom: 16 }}>
        <ul style={{ ...listStyle, marginBottom: 0, color: '#991b1b' }}>
          <li>All payments made on this platform are <strong>final and non-refundable</strong>.</li>
          <li>Once a service is purchased, it cannot be cancelled or refunded under any circumstances.</li>
          <li>By making a payment, you acknowledge and agree to this no-refund policy.</li>
        </ul>
      </div>

      <h2 style={sectionTitleStyle}>7. Service Delivery</h2>
      <ul style={listStyle}>
        <li>Digital services are delivered online within the communicated timeframe</li>
        <li>Physical 3D printed products are shipped via third-party delivery partners</li>
        <li>Delivery timelines may vary depending on production time, location, and logistics</li>
        <li>VJ-3D-WORKS is not responsible for delays caused by courier or delivery services</li>
        <li>Customers must provide accurate shipping details; incorrect information may result in failed or delayed delivery</li>
      </ul>

      <h2 style={sectionTitleStyle}>8. Intellectual Property</h2>
      <p style={paraStyle}>
        All content on this platform (logos, design, text, graphics) is owned by VJ-3D-WORKS
        and may not be reused without permission.
      </p>

      <h2 style={sectionTitleStyle}>9. Limitation of Liability</h2>
      <p style={paraStyle}>We are not liable for:</p>
      <ul style={listStyle}>
        <li>Any indirect or incidental damages</li>
        <li>Loss of data or profits</li>
        <li>Service interruptions beyond our control</li>
      </ul>

      <h2 style={sectionTitleStyle}>10. Termination</h2>
      <p style={paraStyle}>
        We reserve the right to suspend or terminate access if users violate these terms.
      </p>

      <h2 style={sectionTitleStyle}>11. Changes to Terms</h2>
      <p style={paraStyle}>
        We may update these Terms at any time. Continued use of the service means acceptance of updated terms.
      </p>

      <h2 style={sectionTitleStyle}>12. Contact Information</h2>
      <p style={paraStyle}>
        For any questions: <a href="mailto:vj3dworks@gmail.com" style={{ color: '#2563eb', fontWeight: 500 }}>vj3dworks@gmail.com</a>
      </p>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e5e5e5', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/privacy" style={{ color: '#2563eb', fontSize: 14, fontWeight: 500 }}>Privacy Policy →</Link>
        <Link to="/" style={{ color: '#888', fontSize: 14 }}>← Back to Home</Link>
      </div>
    </div>
  );
}

// ── PRIVACY POLICY ──
export function PrivacyPolicy() {
  return (
    <div style={pageStyle}>
      <div style={badgeStyle}>Legal</div>
      <h1 style={headingStyle}>Privacy Policy</h1>
      <p style={dateStyle}>Last Updated: April 7, 2026</p>

      <p style={paraStyle}>
        At VJ-3D-WORKS, we value your privacy. This policy explains how we collect and use your information.
      </p>

      <h2 style={sectionTitleStyle}>1. Information We Collect</h2>
      <p style={paraStyle}>We may collect:</p>
      <ul style={listStyle}>
        <li>Name, email, phone number</li>
        <li>Payment details (processed securely via payment gateway)</li>
        <li>Usage data (IP address, browser type, device info)</li>
      </ul>

      <h2 style={sectionTitleStyle}>2. How We Use Information</h2>
      <p style={paraStyle}>We use your information to:</p>
      <ul style={listStyle}>
        <li>Provide and improve our services</li>
        <li>Process payments</li>
        <li>Communicate with users</li>
        <li>Ensure security and prevent fraud</li>
      </ul>

      <h2 style={sectionTitleStyle}>3. Payment Information</h2>
      <p style={paraStyle}>
        We do not store your card or payment details. Payments are processed securely
        via trusted third-party payment providers.
      </p>

      <h2 style={sectionTitleStyle}>4. Cookies</h2>
      <p style={paraStyle}>We may use cookies to:</p>
      <ul style={listStyle}>
        <li>Improve user experience</li>
        <li>Analyze site traffic</li>
      </ul>

      <h2 style={sectionTitleStyle}>5. Data Sharing</h2>
      <p style={paraStyle}>We do not sell your data. We may share data with:</p>
      <ul style={listStyle}>
        <li>Payment processors</li>
        <li>Legal authorities (if required)</li>
      </ul>

      <h2 style={sectionTitleStyle}>6. Data Security</h2>
      <p style={paraStyle}>
        We implement reasonable security measures to protect your data.
      </p>

      <h2 style={sectionTitleStyle}>7. User Rights</h2>
      <p style={paraStyle}>You have the right to:</p>
      <ul style={listStyle}>
        <li>Access your data</li>
        <li>Request correction or deletion</li>
        <li>Contact us for privacy concerns</li>
      </ul>

      <h2 style={sectionTitleStyle}>8. Third-Party Services</h2>
      <p style={paraStyle}>
        Our website may use third-party services (e.g., hosting providers like Vercel),
        which may collect limited data.
      </p>

      <h2 style={sectionTitleStyle}>9. Changes to Policy</h2>
      <p style={paraStyle}>
        We may update this Privacy Policy periodically.
      </p>

      <h2 style={sectionTitleStyle}>10. Contact Us</h2>
      <p style={paraStyle}>
        Email: <a href="mailto:vj3dworks@gmail.com" style={{ color: '#2563eb', fontWeight: 500 }}>vj3dworks@gmail.com</a>
      </p>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e5e5e5', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/terms" style={{ color: '#2563eb', fontSize: 14, fontWeight: 500 }}>Terms of Service →</Link>
        <Link to="/" style={{ color: '#888', fontSize: 14 }}>← Back to Home</Link>
      </div>
    </div>
  );
}

// ── SHIPPING POLICY ──
export function ShippingPolicy() {
  return (
    <div style={pageStyle}>
      <div style={badgeStyle}>Legal</div>
      <h1 style={headingStyle}>Shipping Policy</h1>
      <p style={dateStyle}>Last Updated: April 7, 2026</p>

      <h2 style={sectionTitleStyle}>Delivery Timeline</h2>
      <ul style={listStyle}>
<li>All the orders are shipped and delivered in 2 to 5 days in the respective address</li>
        <li>Standard delivery: <strong>3–5 business days</strong> across India</li>
        <li>Custom orders may take additional time depending on complexity</li>
        <li>You will be notified on WhatsApp once your order is shipped</li>
      </ul>

      <h2 style={sectionTitleStyle}>Shipping Charges</h2>
      <ul style={listStyle}>
        <li>Free shipping on orders above ₹999</li>
        <li>₹80 shipping charge for orders below ₹999</li>
      </ul>

      <h2 style={sectionTitleStyle}>Coverage</h2>
      <p style={paraStyle}>
        We ship to all states and union territories across India via trusted courier partners
        (India Post, DTDC, Delhivery etc.).
      </p>

      <h2 style={sectionTitleStyle}>Responsibility</h2>
      <ul style={listStyle}>
        <li>VJ-3D-WORKS is not responsible for delays caused by courier services</li>
        <li>Please provide accurate shipping address at checkout</li>
        <li>Incorrect address may result in failed delivery — extra charges may apply for re-delivery</li>
      </ul>

      <h2 style={sectionTitleStyle}>Contact</h2>
      <p style={paraStyle}>
        For shipping queries, WhatsApp us at{' '}
        <a href="https://wa.me/919159432954" style={{ color: '#2563eb', fontWeight: 500 }}>+91 91594 32954</a>
      </p>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e5e5e5', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/terms" style={{ color: '#2563eb', fontSize: 14, fontWeight: 500 }}>Terms of Service →</Link>
        <Link to="/" style={{ color: '#888', fontSize: 14 }}>← Back to Home</Link>
      </div>
    </div>
  );
}

// ── RETURN POLICY ──
export function ReturnPolicy() {
  return (
    <div style={pageStyle}>
      <div style={{ ...badgeStyle, background: '#991b1b' }}>Important</div>
      <h1 style={headingStyle}>Return & Refund Policy</h1>
      <p style={dateStyle}>Last Updated: April 7, 2026</p>

      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '20px 24px', marginBottom: 28 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#991b1b', marginBottom: 6 }}>No Refund Policy</p>
        <p style={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.7, marginBottom: 0 }}>
          All payments made on this platform are <strong>final and non-refundable</strong>.
          Once a service is purchased or an order is placed, it cannot be cancelled or refunded
          under any circumstances.
        </p>
      </div>

      <h2 style={sectionTitleStyle}>Why We Have This Policy</h2>
      <p style={paraStyle}>
        All our products are custom 3D printed specifically for each customer. Once printing begins,
        materials are used and the product cannot be reused or resold. Therefore, we do not offer
        returns or refunds.
      </p>

      <h2 style={sectionTitleStyle}>Damaged or Wrong Items</h2>
      <p style={paraStyle}>
        If you receive a damaged or incorrect item, please contact us on WhatsApp within 24 hours
        of delivery with photos. We will review and resolve the issue at our discretion.
      </p>

      <h2 style={sectionTitleStyle}>Contact</h2>
      <p style={paraStyle}>
        <a href="https://wa.me/919159432954" style={{ color: '#2563eb', fontWeight: 500 }}>+91 91594 32954</a>
        {' '}or{' '}
        <a href="mailto:vj3dworks@gmail.com" style={{ color: '#2563eb', fontWeight: 500 }}>vj3dworks@gmail.com</a>
      </p>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #e5e5e5', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Link to="/terms" style={{ color: '#2563eb', fontSize: 14, fontWeight: 500 }}>Terms of Service →</Link>
        <Link to="/" style={{ color: '#888', fontSize: 14 }}>← Back to Home</Link>
      </div>
    </div>
  );
}
