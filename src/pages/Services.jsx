// src/pages/Services.jsx
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'vj3dworks',
    icon: '🖨️',
    badge: '3D Printing',
    badgeColor: '#7c3aed',
    badgeBg: '#ede9fe',
    name: 'VJ 3D Works',
    tagline: 'Custom 3D Printing & Design Services',
    description:
      'We provide high-quality custom 3D printing services including nameplates, miniatures, gifts, models, and more. Perfect for personal, business, and creative needs.',
    services: [
      '🧸 Toys & Figurines',
      '🏷️ Nameplates & Signs',
      '🎁 Custom Gifts',
      '🖼️ 3D Photo Frames',
      '📱 Mobile Stands & Cases',
      '🧱 Wall Decor',
      '🔬 Science Project Models',
      '🎨 Custom Designs',
    ],
    address: '54/2, Middle Street, Neganur Village, Gingee — 604202',
    phone: '+91 91594 32954',
    hours: 'Mon–Sat: 9:00 AM – 6:00 PM',
    mapLink: 'https://maps.app.goo.gl/VRdiCmLZZom3eBoW8',
    color: '#7c3aed',
    lightColor: '#f5f3ff',
  },
];

export function Services() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* PAGE HEADER */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display: 'inline-block',
          background: '#1a1a1a',
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '5px 14px',
          borderRadius: 2,
          marginBottom: 20
        }}>
          Our Services
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 700,
          color: '#1a1a1a',
          marginBottom: 14
        }}>
          VJ 3D Works Services
        </h1>

        <p style={{
          fontSize: 16,
          color: '#666',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          We provide custom 3D printing solutions for personal, business, and creative needs.
        </p>
      </div>

      {/* SERVICE CARD */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {services.map((svc) => (
          <div key={svc.id} style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>

            {/* HEADER */}
            <div style={{
              background: svc.lightColor,
              borderBottom: '1px solid #e5e5e5',
              padding: '32px 36px'
            }}>
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  background: '#fff',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32
                }}>
                  {svc.icon}
                </div>

                <div>
                  <span style={{
                    background: svc.badgeBg,
                    color: svc.badgeColor,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: 2
                  }}>
                    {svc.badge}
                  </span>

                  <h2 style={{
                    fontSize: 24,
                    fontWeight: 700,
                    marginTop: 8
                  }}>
                    {svc.name}
                  </h2>

                  <p style={{
                    fontSize: 14,
                    color: svc.color,
                    fontWeight: 600
                  }}>
                    {svc.tagline}
                  </p>
                </div>
              </div>

              <p style={{
                marginTop: 16,
                color: '#555',
                lineHeight: 1.7
              }}>
                {svc.description}
              </p>
            </div>

            {/* BODY */}
            <div style={{
              padding: '28px 36px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32
            }}>

              {/* SERVICES LIST */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                  What We Offer
                </h3>

                {svc.services.map((item, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    {item}
                  </div>
                ))}
              </div>

              {/* CONTACT */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
                  Contact & Location
                </h3>

                <p>📍 {svc.address}</p>
                <p>📞 {svc.phone}</p>
                <p>🕐 {svc.hours}</p>

                <a href={svc.mapLink} target="_blank" rel="noreferrer">
                  🗺️ View on Google Maps
                </a>

                {/* BUTTONS */}
                <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                  <a
                    href={`mailto:vj3dworks@gmail.com?subject=Service%20Enquiry`}
                    style={{
                      background: '#7c3aed',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: 4,
                      textDecoration: 'none'
                    }}
                  >
                    📧 Email Us
                  </a>

                  <a
                    href={`tel:${svc.phone}`}
                    style={{
                      background: '#1a1a1a',
                      color: '#fff',
                      padding: '10px 18px',
                      borderRadius: 4,
                      textDecoration: 'none'
                    }}
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 56,
        background: '#1a1a1a',
        borderRadius: 12,
        padding: 40,
        textAlign: 'center',
        color: '#fff'
      }}>
        <h2>Need a Custom 3D Print?</h2>
        <p style={{ color: '#ccc' }}>
          Contact us anytime for custom orders and enquiries.
        </p>

        <a
          href="mailto:vj3dworks@gmail.com"
          style={{
            display: 'inline-block',
            marginTop: 20,
            background: '#7c3aed',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 4,
            textDecoration: 'none'
          }}
        >
          📧 Contact via Email
        </a>
      </div>

    </div>
  );
}

export default Services;