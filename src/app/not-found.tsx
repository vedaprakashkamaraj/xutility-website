import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="mono text-sm text-zinc-600">404 / PAGE NOT FOUND</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em]">Nothing here.</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-zinc-500">
        The page you were looking for moved or never existed. Try the download page or head back home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn">Back home</Link>
        <Link href="/download" className="btn-ghost">Download</Link>
      </div>
    </section>
  );
}
