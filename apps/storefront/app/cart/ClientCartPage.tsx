"use client";

import { useThemeComponent } from "@storefuse/core";

export default function ClientCartPage() {
  const CartPage = useThemeComponent("CartPage");

  if (!CartPage) return null;
  return <CartPage />;
}
