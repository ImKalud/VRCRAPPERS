export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const page = url.searchParams.get("page") || "global";
  const readOnly = url.searchParams.get("read") === "1";

  let count = await env.VISIT_KV.get(page);
  count = count ? Number(count) : 0;

  if (!readOnly) {
    count++;
    await env.VISIT_KV.put(page, count.toString());
  }

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
