// swiper@8 package.json "exports" doesn't expose root types under bundler
// resolution; this shim keeps the template's `import { Navigation } from "swiper"`.
declare module "swiper" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Navigation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Pagination: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Autoplay: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _default: any;
  export default _default;
}
