import Header from "@/components/bodyshape/Header";
import Footer from "@/components/bodyshape/Footer";
import ScrollTop from "@/components/bodyshape/ScrollTop";

// Bump on every CSS/asset change — busts browser/proxy cache of the
// fixed-URL static stylesheets (otherwise mobile keeps the stale CSS).
export const ASSET_V = "14";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Oswald:wght@200;300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
      <link rel="stylesheet" href="/assets/vendor/switcher/switcher.css" />
      <link rel="stylesheet" href={`/assets/css/style.css?v=${ASSET_V}`} />
      {/* skin-1 defines --gradient / --primary-shadow used by highlighted
          section words; without it those texts render transparent */}
      <link rel="stylesheet" href={`/assets/css/skin/skin-1.css?v=${ASSET_V}`} />
      {/* eVitality custom overrides — must load last */}
      <link rel="stylesheet" href={`/assets/css/evitality.css?v=${ASSET_V}`} />

      <div className="page-wraper">
        <Header />
        {children}
        <Footer />
      </div>
      <ScrollTop />
    </>
  );
}
