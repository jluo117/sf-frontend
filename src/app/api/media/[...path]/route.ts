import { apiFetch } from "@/lib/apiClient";

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { path } = await params;
  const response = await apiFetch(`/media/${path.map(encodeURIComponent).join("/")}`);

  if (!response.ok) return new Response(null, { status: response.status });

  return new Response(response.body, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}