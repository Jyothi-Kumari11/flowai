import Stripe from "stripe";

// Initialize Stripe only if a real secret key is provided
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
      typescript: true,
    })
  : (null as unknown as Stripe);

export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    priceId: null,
    features: [
      "3 Projects",
      "10 Tasks per project",
      "2 Team members",
      "5 AI suggestions/month",
      "Basic analytics",
    ],
    limits: {
      projects: 3,
      tasksPerProject: 10,
      members: 2,
      aiUsage: 5,
    },
  },
  PRO: {
    name: "Pro",
    price: 12,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_dummy",
    features: [
      "Unlimited Projects",
      "Unlimited Tasks",
      "25 Team members",
      "200 AI suggestions/month",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
    limits: {
      projects: -1,
      tasksPerProject: -1,
      members: 25,
      aiUsage: 200,
    },
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 49,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise_dummy",
    features: [
      "Everything in Pro",
      "Unlimited members",
      "Unlimited AI usage",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
      "Custom AI models",
    ],
    limits: {
      projects: -1,
      tasksPerProject: -1,
      members: -1,
      aiUsage: -1,
    },
  },
};
