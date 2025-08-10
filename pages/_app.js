import '@/styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  const siteName = 'William James — Portfolio';
  const siteDescription = 'Software Engineer portfolio: projects, skills, and contact.';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteOgImage = `${siteUrl}/images/og-image.png`;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{siteName}</title>
        <meta name="description" content={siteDescription} />
        <meta name="theme-color" content="#0b1220" />

        <link rel="canonical" href={siteUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={siteOgImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteOgImage} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
