'use client';

// Declare dataLayer type
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MNLHPC3W';
const isDev = process.env.NODE_ENV === 'development';

/**
 * Utility to safe-push events to the GTM dataLayer with local debugging console logs.
 */
export function pushToDataLayer(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !GTM_ID) return;

  // Initialize dataLayer if missing
  window.dataLayer = window.dataLayer || [];

  const payload = {
    event: eventName,
    ...params,
  };

  window.dataLayer.push(payload);

  if (isDev) {
    console.log(`[Analytics] Event Sent: ${eventName}`, params);
  }
}

/**
 * Tracks page view details in GTM/GA4.
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !GTM_ID) return;

  const title = typeof document !== 'undefined' ? document.title : '';

  pushToDataLayer('page_view', {
    page_path: url,
    page_title: title,
    page_location: window.location.href,
  });

  if (isDev) {
    console.log(`[Analytics] Page View Sent: ${url} (${title})`);
  }
}

/**
 * Tracks lead submissions (inquiry form generated leads).
 * Banned: email, phoneNumber, message.
 */
export function trackInquiry(params: {
  destination: string;
  travelMonth: string;
  travelers: number;
  budgetRange: string;
}) {
  pushToDataLayer('generate_lead', {
    destination: params.destination,
    travelMonth: params.travelMonth,
    travelers: params.travelers,
    budgetRange: params.budgetRange,
  });
}

/**
 * Tracks WhatsApp floating or inline clicks.
 */
export function trackWhatsAppClick(page: string, buttonLocation: string) {
  pushToDataLayer('whatsapp_click', {
    page,
    button_location: buttonLocation,
  });
}

/**
 * Tracks Phone link click submissions.
 */
export function trackPhoneCall(page: string) {
  pushToDataLayer('phone_call', {
    page,
  });
}

/**
 * Tracks Package Detail Page view events.
 */
export function trackPackageView(packageName: string, destination: string) {
  pushToDataLayer('view_package', {
    package_name: packageName,
    destination,
  });
}

/**
 * Tracks Destination detail page view events.
 */
export function trackDestinationView(destinationName: string) {
  pushToDataLayer('view_destination', {
    destination_name: destinationName,
  });
}

/**
 * Tracks Blog open/read actions.
 */
export function trackBlogRead(blogTitle: string) {
  pushToDataLayer('read_blog', {
    blog_title: blogTitle,
  });
}

/**
 * Tracks Contact Button/Inquire CTA clicks.
 */
export function trackContactClick(page: string) {
  pushToDataLayer('contact_click', {
    page,
  });
}
