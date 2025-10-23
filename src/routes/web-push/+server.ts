import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_VAPID_KEY } from '$env/static/public';
import { PRIVATE_VAPID_KEY } from '$env/static/private';
import webpush from 'web-push';
import { db } from '$lib/server/db/index';
import { subscription as subscriptionTable } from '$lib/server/db/schema';

webpush.setVapidDetails(
    'mailto:huan.sock@gmail.com',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);

export const GET: RequestHandler = async () => {
    try {
        // 1. 요청이 올 때마다 최신 구독 목록을 DB에서 가져옵니다.
        const allSubscriptions = await db.select().from(subscriptionTable);

        if (allSubscriptions.length === 0) {
            return json({ success: true, message: 'No subscriptions to notify.' });
        }

        // 2. 모든 알림 전송 Promise를 배열에 담습니다.
        const notificationPromises = allSubscriptions.map((sub) =>
            webpush.sendNotification(
                {
                    endpoint: sub.endpoint,
                    keys: {
                        auth: sub.auth,
                        p256dh: sub.p256dh
                    }
                },
                'Hello from SvelteKit Web Push Notifications!'
            )
        );

        // 3. Promise.all을 사용해 모든 알림이 처리될 때까지 기다립니다.
        await Promise.all(notificationPromises);

        return json({ success: true, message: 'Notifications sent successfully.' });
    } catch (error) {
        console.error('Error sending notifications:', error);
        return json({ success: false, message: 'Failed to send notifications.' }, { status: 500 });
    }
};
