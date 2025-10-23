import {PUBLIC_VAPID_KEY} from '$env/static/public';
import {db} from '$lib/server/db/index';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { subscription as subscriptionTable } from '$lib/server/db/schema';

// 수신할 구독 객체의 타입을 명확히 정의합니다.
interface SubscriptionKeys {
    p256dh: string;
    auth: string;
}

interface SubscriptionJSON {
    endpoint: string;
	keys: SubscriptionKeys;
}

export const POST: RequestHandler = async ({ request }) => {
    // 타입을 SubscriptionJSON으로 지정합니다.
    const subscription: SubscriptionJSON = await request.json();

    try {
        await db.insert(subscriptionTable).values({
            endpoint: subscription.endpoint,
            // subscription.keys 객체에서 직접 값을 가져옵니다.
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth
        });
        return json({ status: 'success' });
    } catch (error) {
        console.error('Error saving subscription:', error);
        return json({ status: 'error', message: 'Failed to save subscription' }, { status: 500 });
    }
};

export const GET: RequestHandler = async () => {
	return json({ vapidKey: PUBLIC_VAPID_KEY });
};
