import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, PLANS } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planKey } = await req.json();
    const selectedPlan = PLANS[planKey as keyof typeof PLANS] || PLANS.PRO;

    // In local dev without live Stripe keys, simulate checkout redirect
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        url: "/dashboard?checkout_status=success&plan=pro",
      });
    }

    // Live Stripe Checkout Session
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `FlowAI ${selectedPlan.name} Plan`,
              description: `Subscription with ${selectedPlan.features.join(", ")}`,
            },
            unit_amount: selectedPlan.price * 100, // cents
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: session.user.email || undefined,
      success_url: `${origin}/billing?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${origin}/billing?canceled=true`,
      metadata: {
        userId: session.user.id || "",
        plan: planKey,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
