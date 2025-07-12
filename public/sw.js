self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  if (!data.title) return;

  self.registration.showNotification(data.title, {
    vibrate: [100, 50, 100],
    ...data,
  });
});
