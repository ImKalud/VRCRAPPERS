export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/visit") {
      const page = url.searchParams.get("page") || "global";

      let count = await env.VISIT_KV.get(page);
      count = count ? Number(count) : 0;

      count++;
      
      await env.VISIT_KV.put(page, count.toString());

      return new Response(
        JSON.stringify({ page, count }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    return new Response("Not Found", { status: 404 });
  }
};
