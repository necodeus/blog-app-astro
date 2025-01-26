export async function GET({ cookies }: any) {
  const newVersion = 'next';

  cookies.set("version", newVersion, { path: "/" });

  return new Response(
    JSON.stringify({
      version: newVersion,
    })
  );
}
