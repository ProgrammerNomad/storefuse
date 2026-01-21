import type { CartItem } from "@storefuse/core";

export interface CheckoutRedirectOptions {
  /**
   * WooCommerce store URL
   */
  storeUrl: string;

  /**
   * Cart items to add to checkout
   */
  items: CartItem[];

  /**
   * Optional prefill data
   */
  prefill?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };

  /**
   * Optional coupon code
   */
  coupon?: string;

  /**
   * Optional custom return URL
   */
  returnUrl?: string;
}

/**
 * Generate WooCommerce checkout URL with cart items
 */
export function generateCheckoutUrl(options: CheckoutRedirectOptions): string {
  const { storeUrl, items, prefill, coupon, returnUrl } = options;

  // Build base checkout URL
  const baseUrl = `${storeUrl.replace(/\/$/, "")}/checkout/`;
  const params = new URLSearchParams();

  // Add cart items as query parameters
  // WooCommerce format: add-to-cart[]=123&quantity[]=2&add-to-cart[]=456&quantity[]=1
  items.forEach((item) => {
    params.append("add-to-cart[]", item.productId);
    params.append("quantity[]", item.quantity.toString());
  });

  // Add prefill data if provided
  if (prefill) {
    if (prefill.firstName) params.append("billing_first_name", prefill.firstName);
    if (prefill.lastName) params.append("billing_last_name", prefill.lastName);
    if (prefill.email) params.append("billing_email", prefill.email);
    if (prefill.phone) params.append("billing_phone", prefill.phone);
    if (prefill.company) params.append("billing_company", prefill.company);
    if (prefill.address1) params.append("billing_address_1", prefill.address1);
    if (prefill.address2) params.append("billing_address_2", prefill.address2);
    if (prefill.city) params.append("billing_city", prefill.city);
    if (prefill.state) params.append("billing_state", prefill.state);
    if (prefill.postcode) params.append("billing_postcode", prefill.postcode);
    if (prefill.country) params.append("billing_country", prefill.country);
  }

  // Add coupon if provided
  if (coupon) {
    params.append("coupon_code", coupon);
  }

  // Add return URL if provided
  if (returnUrl) {
    params.append("return_url", returnUrl);
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Redirect to WooCommerce checkout
 */
export function redirectToCheckout(options: CheckoutRedirectOptions): void {
  const checkoutUrl = generateCheckoutUrl(options);
  
  if (typeof window !== "undefined") {
    window.location.href = checkoutUrl;
  }
}
