
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const formData = await req.formData();
    console.log(formData)
  const keys = Array.from(formData.keys());



  return new Response(JSON.stringify({ keys }), {
    headers: { 'Content-Type': 'application/json' },
  });
}