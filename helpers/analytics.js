const GA_MEASUREMENT_ID = "G-T72TYPR1EE";

const getGtag = () => {
  if (typeof window === "undefined") return null;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === "function") {
    return window.gtag;
  }

  // Ensure a global gtag exists even before the GA script finishes loading.
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  return window.gtag;
};

export const trackAnalyticsEvent = ({
  action,
  category,
  label,
  value,
  ...rest
}) => {
  const gtag = getGtag();
  if (!gtag || !action) return;

  const params = {
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
    ...rest,
  };

  if (category != null) params.event_category = category;
  if (label != null) params.event_label = label;
  if (value != null) params.value = value;

  gtag("event", action, params);
};

export const trackOutboundClick = ({
  action = "outbound_click",
  label,
  url,
  location,
}) => {
  trackAnalyticsEvent({
    action,
    category: "outbound",
    label,
    link_url: url,
    click_location: location,
  });
};

export const useAnalyticsEvent = () => {
  return { event: trackAnalyticsEvent };
};
