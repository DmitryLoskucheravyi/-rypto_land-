/** @type {import('next').NextConfig} */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').trim().replace(/^\/+|\/+$/g, '');

const nextConfig = {
  // Fully static: no server requests, all content lives in app/lib and is baked
  // into HTML at build time. The output is out/, which any static host serves.
  output: 'export',
  // The image optimizer is a server endpoint, which a static site does not have.
  images: { unoptimized: true },
  trailingSlash: true,
  // GitHub Pages serves a project site from /<repo>/. Set at build time.
  basePath: basePath ? `/${basePath}` : undefined,
};

export default nextConfig;
