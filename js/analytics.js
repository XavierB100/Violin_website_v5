// Google Analytics 4 Setup
// Measurement ID: G-1TCPHK7E7W
// Stream ID: 11671175116
// Stream URL: https://www.violinplayer.pro

// Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1TCPHK7E7W', {
  page_title: document.title,
  page_location: window.location.href,
  custom_map: {
    'custom_dimension_1': 'user_type',
    'custom_dimension_2': 'event_type'
  }
});

// Track form submissions
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      gtag('event', 'form_submit', {
        'event_category': 'Contact',
        'event_label': 'Contact Form'
      });
    });
  }
  
  // Track booking page visits
  if (window.location.pathname.includes('booking.html')) {
    gtag('event', 'page_view', {
      'event_category': 'Booking',
      'event_label': 'Booking Page'
    });
  }
  
  // Track phone number clicks
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'phone_click', {
        'event_category': 'Contact',
        'event_label': 'Phone Call'
      });
    });
  });
  
  // Track WhatsApp clicks
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'whatsapp_click', {
        'event_category': 'Contact',
        'event_label': 'WhatsApp'
      });
    });
  });
  
  // Track email clicks
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'email_click', {
        'event_category': 'Contact',
        'event_label': 'Email'
      });
    });
  });
});

// Enhanced Ecommerce tracking for services
function trackServiceView(serviceName, servicePrice) {
  gtag('event', 'view_item', {
    'currency': 'GBP',
    'value': servicePrice,
    'items': [{
      'item_id': serviceName.toLowerCase().replace(/\s+/g, '_'),
      'item_name': serviceName,
      'price': servicePrice,
      'currency': 'GBP',
      'category': 'Violin Performance'
    }]
  });
}

// Track service inquiries
function trackServiceInquiry(serviceName) {
  gtag('event', 'begin_checkout', {
    'event_category': 'Service Inquiry',
    'event_label': serviceName,
    'currency': 'GBP',
    'value': 0
  });
} 
