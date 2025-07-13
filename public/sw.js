self.addEventListener('push', async (event) => {
  if (!event.data) return;

  const data = event.data.json();
  if (!data.title) return;

  const allClients = await self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  const isFocused = allClients.some((client) => client.focused);
  if (!isFocused) {
    self.registration.showNotification(data.title, {
      vibrate: [100, 50, 100],
      ...data,
    });
  }
});
