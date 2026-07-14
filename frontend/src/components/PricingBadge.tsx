import type { PricingModel, BillingFrequency } from "@/lib/types";
import { cn } from "@/lib/utils";

const PRICING_LABEL: Record<PricingModel, string> = {
  FREE: "Free",
  FREEMIUM: "Freemium",
  PAID: "Paid",
  FREE_TRIAL: "Free Trial",
};

const PRICING_DOT: Record<PricingModel, string> = {
  FREE: "bg-pricing-free",
  FREEMIUM: "bg-pricing-freemium",
  PAID: "bg-pricing-paid",
  FREE_TRIAL: "bg-pricing-trial",
};

const FREQUENCY_LABEL: Record<BillingFrequency, string> = {
  MONTHLY: "/mo",
  YEARLY: "/yr",
  ONE_TIME: " one-time",
  NA: "",
};

type PricingBadgeProps = {
  pricingModel: PricingModel;
  pricingAmount?: string | null;
  billingFrequency?: BillingFrequency;
  className?: string;
};

export function PricingBadge({
  pricingModel,
  pricingAmount,
  billingFrequency = "NA",
  className,
}: PricingBadgeProps) {
  const showAmount = pricingModel !== "FREE" && pricingAmount && Number(pricingAmount) > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-foreground-muted",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", PRICING_DOT[pricingModel])} aria-hidden="true" />
      {PRICING_LABEL[pricingModel]}
      {showAmount && (
        <span className="text-foreground-faint">
          {" "}
          ${pricingAmount}
          {FREQUENCY_LABEL[billingFrequency]}
        </span>
      )}
    </span>
  );
}
