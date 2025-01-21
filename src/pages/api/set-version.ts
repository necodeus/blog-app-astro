const versions = ["next", "nuxt"];

const getNewVersion = (currentVersion: string) => {
  const currentIndex = versions.indexOf(currentVersion);
  const nextIndex = (currentIndex + 1) % versions.length;
  return versions[nextIndex];
};

export async function GET({ cookies }: any) {
  const newVersion = getNewVersion(cookies.get("version").value);
  cookies.set("version", newVersion, { path: "/" });

  return new Response(
    JSON.stringify({
      version: newVersion,
    })
  );
}
