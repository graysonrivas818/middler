const pushGtagEvent = (action, params) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  // Prefer the real gtag when loaded; otherwise queue the same command shape
  // so events still fire after the lazyOnload GA script initializes.
  const gtag =
    typeof window.gtag === "function"
      ? window.gtag
      : function gtag() {
          window.dataLayer.push(arguments);
        };

  gtag("event", action, params);
};

export const trackAnalyticsEvent = ({
  action,
  category,
  label,
  value,
  ...rest
}) => {
  pushGtagEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
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
