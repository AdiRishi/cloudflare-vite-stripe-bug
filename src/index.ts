import Stripe from 'stripe';

interface Env {
	STRIPE_API_KEY: string;
}

async function handleStripeTest(env: Env): Promise<Response> {
	const stripe = new Stripe(env.STRIPE_API_KEY || 'my-api-key');
	const customer = await stripe.customers.create({
		email: 'example@example.com',
		name: 'Example Customer',
	});

	return new Response(JSON.stringify({ customer }), {
		headers: { 'Content-Type': 'application/json' },
	});
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const rootPattern = new URLPattern({ pathname: '/' });
		const stripeTestPattern = new URLPattern({ pathname: '/stripe-test' });

		const url = new URL(request.url);

		if (rootPattern.test(url)) {
			return new Response('Hello World!');
		} else if (stripeTestPattern.test(url)) {
			return handleStripeTest(env);
		}

		return new Response('Not found', { status: 404 });
	},
} as ExportedHandler<Env>;
