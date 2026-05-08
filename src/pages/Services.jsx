// src/pages/Services.jsx
import { Link } from 'react-router-dom';

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const services = [
  {
    id:          'esevai',
    icon:        '🏛️',
    badge:       'Government Services',
    badgeColor:  '#1d4ed8',
    badgeBg:     '#dbeafe',
    name:        'Meena CSC & E-Sevai Centre',
    tagline:     'All Government Services at One Place',
    description: 'Authorised E-Sevai & Common Service Centre (CSC) offering all Tamil Nadu government services including certificates, applications, and registrations — quickly and easily.',
    items: [
      '🪪 Aadhaar Card Services',
      '📜 Birth & Death Certificate',
      '🏠 Community & Nativity Certificate',
      '🎓 Income Certificate',
      '🌾 Patta & Chitta Services',
      '🗳️ Voter ID Registration',
      '🚗 Driving Licence Services',
      '📋 Ration Card Services',
      '💼 Employment Registration',
      '🏥 Health Insurance (Ayushman)',
      '🏦 Bank Account Opening',
      '📱 Mobile & DTH Recharge',
    ],
    address:  '54/2, Middle Street, Neganur Village, Gingee — 604202',
    phone:    '+91 91594 32954',
    wa:       '919159432954',
    waMsg:    'Hi! I need help with E-Sevai / CSC services.',
    hours:    'Mon–Sat: 9:00 AM – 6:00 PM',
    mapLink:  'https://maps.app.goo.gl/VRdiCmLZZom3eBoW8',
    color:    '#1d4ed8',
    light:    '#eff6ff',
  },
  {
    id:          'jktransports',
    icon:        '🚌',
    badge:       'Travel & Transport',
    badgeColor:  '#166534',
    badgeBg:     '#dcfce7',
    name:        'JK Transports',
    tagline:     'Comfortable & Safe Travels Across Tamil Nadu',
    description: 'Reliable travel and transport services for individuals, families and groups. Book your journey with JK Transports for a comfortable and on-time experience anywhere in Tamil Nadu and beyond.',
    items: [
      '🚌 Bus Ticket Booking',
      '🚗 Car Rental (AC & Non-AC)',
      '👨‍👩‍👧 Family Tour Packages',
      '🏢 Corporate Travel',
      '🛕 Temple Tour Packages',
      '🎒 Group Tour Arrangements',
      '🚐 Mini Bus / Van Hire',
      '✈️ Airport Pickup & Drop',
      '🗺️ Outstation Trips',
      '🌙 Night Travel Available',
      '📦 Parcel & Goods Transport',
      '📅 Advance Booking Available',
    ],
    address:  'Neganur Village, Gingee — 604202, Tamil Nadu',
    phone:    '+91 91594 32954',
    wa:       '919159432954',
    waMsg:    'Hi! I need to book a trip / transport with JK Transports.',
    hours:    'Available 24/7 — Call anytime',
    mapLink:  'https://maps.app.goo.gl/VRdiCmLZZom3eBoW8',
    color:    '#166534',
    light:    '#f0fdf4',
  },
];

export function Services() {
  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 24px 80px' }}>

      {/* PAGE HEADER */}
      <div style={{ textAlign:'center', marginBottom:52 }}>
        <div style={{ display:'inline-block', background:'#1a1a1a', color:'#fff', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', padding:'5px 14px', borderRadius:2, marginBottom:18 }}>
          Our Services
        </div>
        <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px, 5vw, 42px)', fontWeight:700, color:'#1a1a1a', marginBottom:12, letterSpacing:'-0.3px' }}>
          More Than Just 3D Prints
        </h1>
        <p style={{ fontSize:15, color:'#666', maxWidth:500, margin:'0 auto', lineHeight:1.7 }}>
          We offer multiple services from our centre in Gingee, Tamil Nadu. Explore what we can help you with.
        </p>
      </div>

      {/* SERVICE CARDS */}
      <div style={{ display:'flex', flexDirection:'column', gap:36 }}>
        {services.map(svc => (
          <div key={svc.id} style={{ background:'#fff', border:'1px solid #e5e5e5', borderRadius:12, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>

            {/* HEADER */}
            <div style={{ background:svc.light, borderBottom:'1px solid #e5e5e5', padding:'28px 32px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:18, flexWrap:'wrap' }}>
                <div style={{ width:60, height:60, background:'#fff', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, flexShrink:0, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
                  {svc.icon}
                </div>
                <div style={{ flex:1 }}>
                  <span style={{ display:'inline-block', background:svc.badgeBg, color:svc.badgeColor, fontSize:11, fontWeight:700, letterSpacing:'0.08em', padding:'3px 10px', borderRadius:2, textTransform:'uppercase', marginBottom:7 }}>
                    {svc.badge}
                  </span>
                  <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(19px, 2.5vw, 24px)', fontWeight:700, color:'#1a1a1a', marginBottom:5 }}>
                    {svc.name}
                  </h2>
                  <p style={{ fontSize:13.5, fontWeight:600, color:svc.color, margin:0 }}>{svc.tagline}</p>
                </div>
              </div>
              <p style={{ fontSize:14, color:'#555', lineHeight:1.75, marginTop:16, marginBottom:0 }}>
                {svc.description}
              </p>
            </div>

            {/* BODY */}
            <div style={{ padding:'26px 32px', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(270px, 1fr))', gap:28 }}>

              {/* Services list */}
              <div>
                <h3 style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', marginBottom:14 }}>
                  What We Offer
                </h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {svc.items.map((item, i) => (
                    <div key={i} style={{ fontSize:13, color:'#444', padding:'3px 0', display:'flex', alignItems:'center', gap:4 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact info + buttons */}
              <div>
                <h3 style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', marginBottom:14 }}>
                  Contact & Location
                </h3>

                <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:20 }}>
                  <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                    <span style={{ fontSize:17, flexShrink:0 }}>📍</span>
                    <span style={{ fontSize:13.5, color:'#555', lineHeight:1.6 }}>{svc.address}</span>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <span style={{ fontSize:17 }}>📞</span>
                    <a href={`tel:${svc.phone}`} style={{ fontSize:13.5, color:svc.color, fontWeight:600, textDecoration:'none' }}>{svc.phone}</a>
                  </div>
                  <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                    <span style={{ fontSize:17 }}>🕐</span>
                    <span style={{ fontSize:13.5, color:'#555' }}>{svc.hours}</span>
                  </div>
                  <a href={svc.mapLink} target="_blank" rel="noreferrer" style={{ display:'flex', gap:10, alignItems:'center', textDecoration:'none' }}>
                    <span style={{ fontSize:17 }}>🗺️</span>
                    <span style={{ fontSize:13.5, color:svc.color, fontWeight:600, borderBottom:`1px solid ${svc.color}`, paddingBottom:1 }}>
                      View on Google Maps
                    </span>
                  </a>
                </div>

                {/* Action buttons */}
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <a
                    href={`https://wa.me/${svc.wa}?text=${encodeURIComponent(svc.waMsg)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#25d366', color:'#fff', padding:'11px 20px', borderRadius:4, fontSize:13.5, fontWeight:600, textDecoration:'none', boxShadow:'0 2px 8px rgba(37,211,102,0.3)' }}
                  >
                    {WA_SVG} WhatsApp
                  </a>
                  <a
                    href={`tel:${svc.phone}`}
                    style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#1a1a1a', color:'#fff', padding:'11px 20px', borderRadius:4, fontSize:13.5, fontWeight:600, textDecoration:'none' }}
                  >
                    📞 Call Now
                  </a>
                </div>

                {/* WhatsApp inline contact box */}
                <div style={{ marginTop:16, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'12px 14px', display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontSize:22 }}>💬</span>
                  <div>
                    <div style={{ fontSize:12.5, fontWeight:600, color:'#166534', marginBottom:2 }}>Quick WhatsApp Contact</div>
                    <a
                      href={`https://wa.me/${svc.wa}?text=${encodeURIComponent(svc.waMsg)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize:12, color:'#16a34a', textDecoration:'none', fontWeight:500 }}
                    >
                      wa.me/{svc.wa} →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{ marginTop:52, background:'#1a1a1a', borderRadius:12, padding:'40px 32px', textAlign:'center', color:'#fff' }}>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:26, marginBottom:10 }}>
          Need Help? We're Right Here!
        </h2>
        <p style={{ color:'rgba(255,255,255,0.6)', fontSize:15, marginBottom:28, lineHeight:1.7, maxWidth:520, margin:'0 auto 28px' }}>
          All services — 3D Works, E-Sevai Centre & JK Transports — are operated from the same location in Gingee. Visit us or WhatsApp anytime!
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <a
            href="https://wa.me/919159432954?text=Hi%20VJ%203D%20Works!%20I%20need%20help."
            target="_blank"
            rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#25d366', color:'#fff', padding:'13px 28px', borderRadius:4, fontSize:15, fontWeight:600, textDecoration:'none', boxShadow:'0 4px 16px rgba(37,211,102,0.3)' }}
          >
            {WA_SVG} Chat on WhatsApp
          </a>
          <a
            href="tel:+919159432954"
            style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(255,255,255,0.1)', color:'#fff', padding:'13px 28px', borderRadius:4, fontSize:15, fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.2)' }}
          >
            📞 +91 91594 32954
          </a>
        </div>
        <p style={{ color:'rgba(255,255,255,0.35)', fontSize:12, marginTop:20 }}>
          📍 54/2, Middle Street, Neganur Village, Gingee — 604202, Tamil Nadu
        </p>
      </div>

      {/* FLOATING WA BUTTON */}
      <a
        href="https://wa.me/919159432954"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}

export default Services;
