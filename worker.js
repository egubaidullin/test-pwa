// This worker will be implemented later.
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});


async function handleRequest(request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');

   if(!latitude || !longitude) {
       return new Response("Missing latitude or longitude", { status: 400 });
   }

  // Placeholder response for now
   const services =  [{
      id: 1,
      name: "Sample Hospital",
      address: "123 Main St",
      latitude: parseFloat(latitude) + 0.01,
      longitude: parseFloat(longitude) + 0.01,
      phone: "555-1234",
      service_type: "Hospital"
   }];
  return new Response(JSON.stringify(services), {
    headers: { 'Content-Type': 'application/json' },
  });
}