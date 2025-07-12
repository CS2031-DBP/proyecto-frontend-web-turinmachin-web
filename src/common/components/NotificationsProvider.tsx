'use client';
import { useApiClient } from '@/api/hooks/use-api-client';
import { Session } from 'next-auth';
import { useCallback, useEffect } from 'react';
import { usePopup } from '../hooks/use-popup';

export interface Props {
  session: Session;
}

export const NotificationsProvider = () => {
  const { apiClient } = useApiClient();
  const { openPopup } = usePopup();

  const enableNotifications = useCallback(async () => {
    if (!('PushManager' in window)) {
      console.warn("Push messaging isn't supported.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
      });
    }

    const key = subscription.getKey?.('p256dh');
    const auth = subscription.getKey?.('auth');

    if (!key || !auth) {
      console.warn("Subscription didn't have key or auth");
      return;
    }

    const data = {
      endpoint: subscription.endpoint,
      key: btoa(String.fromCharCode.apply(null, [...new Uint8Array(key)])),
      auth: btoa(String.fromCharCode.apply(null, [...new Uint8Array(auth)])),
    };

    console.log('sub:', subscription);
    console.log('sending:', data);
    await apiClient.saveSubscription({ body: data });
  }, [apiClient]);

  const initNotifications = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers are not supported in this browser.');
    }

    await navigator.serviceWorker.register('/sw.js');

    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.warn("Notifications aren't supported.");
      return;
    }

    if (
      Notification.permission === 'default' &&
      localStorage.getItem('notificationsPromptDisabled') !== 'true'
    ) {
      openPopup('enableNotifications', { onGrant: enableNotifications });
      return;
    }

    if (Notification.permission !== 'granted') {
      console.warn('The user has blocked notifications.');
      return;
    }

    enableNotifications();
  }, [openPopup, enableNotifications]);

  useEffect(() => {
    initNotifications();
  }, []);

  return null;
};
