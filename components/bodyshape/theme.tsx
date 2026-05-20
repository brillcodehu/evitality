/* Ported from bodyshape template constants/theme.js — image paths point to /assets */
import { FooterMap } from "./FooterMap";

// Custom eVitality images change content under the same filename; bust cache.
const IMG_V = "16";
const img = (p: string) =>
  p.startsWith("evitality/")
    ? `/assets/images/${p}?v=${IMG_V}`
    : `/assets/images/${p}`;

export const IMAGES = {
  BgImage1: img("background/bg1.png"),
  BgImage2: img("background/bg2.png"),
  BgImage3: img("background/bg3.png"),

  SliderBg1: img("main-slider/slider1/bg1.jpg"),

  logo: img("logo.png"),
  logo1: img("logo/logo1.png"),
  logo2: img("logo/logo2.png"),
  logo3: img("logo/logo3.png"),

  boxlog1: img("icon-box/logo1.png"),
  boxlog2: img("icon-box/logo2.png"),
  boxlog3: img("icon-box/logo3.png"),
  boxlog4: img("icon-box/logo4.png"),

  aboutlogo1: img("about/logo1.png"),
  aboutlogo2: img("about/logo2.png"),
  aboutlogo3: img("about/logo3.png"),
  aboutlogo4: img("about/logo4.png"),

  aboutgirl: img("evitality/eva-hero.png"),
  aboutman: img("about/man.png"),
  boxpic1: img("evitality/about-1.jpg"),
  boxpic2: img("evitality/about-2.jpg"),
  sliderpic1: img("evitality/eva-hero8.png"),
  footerbg: img("background/footer-bg.png"),
  footergril1: img("evitality/eva-hero.png"),

  footercircle: img("pattern/circle-footer-1.svg"),
  circlesvg1: img("pattern/pattern1.svg"),
  circlesvg2: img("pattern/pattern1.svg"),

  portfolio1: img("portfolio/pic1.jpg"),
  portfolio2: img("portfolio/pic2.jpg"),
  portfolio3: img("portfolio/pic3.jpg"),

  bloggrid1: img("blog/blog-grid/pic1.jpg"),
  bloggrid2: img("blog/blog-grid/pic2.jpg"),
  bloggrid3: img("blog/blog-grid/pic3.jpg"),

  avatar1: img("avatar/avatar1.jpg"),
  avatar2: img("avatar/avatar2.jpg"),
  avatar3: img("avatar/avatar3.jpg"),

  avatarlarge1: img("avatar/large/avatar1.jpg"),
  avatarlarge2: img("avatar/large/avatar2.jpg"),
  avatarlarge3: img("avatar/large/avatar3.jpg"),
};

export const SVGICON = {
  map: <FooterMap />,
  circlebigSvg1: img("pattern/circle-big.svg"),
  circlebigSvg2: img("pattern/circle-2.svg"),
  multilines: (
    <svg viewBox="0 0 596 803" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M300.08 326.885L5.89685 422.456V367.302L300.08 271.746V326.885Z"
        fill="url(#paint0_linear_53_55)"
      />
      <path
        d="M594.417 371.718L154.49 514.145V435.989L594.417 293.562V371.718Z"
        fill="var(--primary)"
      />
      <path
        d="M533.277 239.231L92.5232 382.16V376.355L533.277 233.426V239.231Z"
        fill="var(--primary)"
      />
      <path
        d="M592.417 134.076L151.663 277.02V271.215L592.417 128.271V134.076Z"
        fill="var(--primary)"
      />
      <path
        d="M593.356 109.22L107.549 266.762V260.365L593.356 102.823V109.22Z"
        fill="url(#paint1_linear_53_55)"
      />
      <path
        d="M587.358 216L3.2937 400.915L0.690552 388.073L584.755 203.158L587.358 216Z"
        fill="white"
      />
      <path
        d="M595 334.44L242.565 448.733L242.674 440.158L595 325.912V334.44Z"
        fill="white"
      />
      <path
        d="M585.356 284.285L45.7017 459.289V437.952L585.356 262.949V284.285Z"
        fill="var(--primary)"
      />
      <path
        d="M401.917 216.712L33.7017 336.125V321.574L401.917 202.161V216.712Z"
        fill="url(#paint2_linear_53_55)"
      />
      <path
        d="M595.356 178.583L74.377 347.532V326.927L595.356 157.993V178.583Z"
        fill="url(#paint3_linear_53_55)"
      />
      <path
        d="M593.387 233.927L142.253 380.233V358.896L593.387 212.606V233.927Z"
        fill="url(#paint4_linear_53_55)"
      />
      <path
        d="M437.55 288.331L65.4284 409.005V404.103L437.55 283.429V288.331Z"
        fill="var(--primary)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_53_55"
          x1="5.90132"
          y1="347.096"
          x2="300.081"
          y2="347.096"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="var(--primary-dark)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_53_55"
          x1="107.547"
          y1="184.797"
          x2="593.358"
          y2="184.797"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="var(--primary-dark)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_53_55"
          x1="33.7026"
          y1="269.142"
          x2="401.918"
          y2="269.142"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="var(--primary-dark)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_53_55"
          x1="74.3779"
          y1="252.758"
          x2="595.358"
          y2="252.758"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="var(--primary-dark)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_53_55"
          x1="142.26"
          y1="296.413"
          x2="593.388"
          y2="296.413"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="var(--primary-dark)" />
          <stop offset="1" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
