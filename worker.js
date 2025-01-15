addEventListener('fetch', event => {
    event.respondWith(handleRequest(event));
});


async function handleRequest(event) {
   const request = event.request;
   const url = new URL(request.url);

    if (url.pathname.startsWith('/api/worker')) {
        const { searchParams } = new URL(request.url);
         const latitude = searchParams.get('latitude');
         const longitude = searchParams.get('longitude');

        if (!latitude || !longitude) {
            return new Response("Missing latitude or longitude", { status: 400 });
        }


        try {
             const emergencyServices = await getEmergencyServices(latitude, longitude, event);
             return new Response(JSON.stringify(emergencyServices), {
                 headers: { 'Content-Type': 'application/json' },
             });
        }
         catch(error) {
            console.error(error)
            return new Response("Error fetching emergency services", { status: 500 });
        }
    }


   try {
      // Serve static files
      const response = await event.fetch(request);
      return response;
  } catch (error) {
      console.error(error);
      return new Response("Error fetching resource", { status: 500 });
  }

}


async function getEmergencyServices(latitude, longitude, event) {
    const db = await (event.platform || globalThis).env.DB; // Access the D1 binding from the environment
    const radius = 120; // Radius in kilometers - adjust as needed

    const query = `
        SELECT id, name, address, latitude, longitude, phone, service_type
        FROM emergency_services
        WHERE ST_Distance(
            Point(longitude, latitude),
            Point(?, ?)
        ) <= ?
    `;

    try {
        const { results } = await db.prepare(query)
            .bind(longitude, latitude, radius / 111.0) // radius is converted to degrees, roughly 1 degree of latitude is ~ 111 km
            .all();
        return results;

    } catch (error) {
      console.error("Error querying D1:", error);
      throw error;
    }
}
