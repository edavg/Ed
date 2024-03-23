/* empty css                            */
import 'html-escaper';
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderSlot, j as renderComponent, k as renderHead, F as Fragment } from '../astro_SrnRbp6A.mjs';
import 'kleur/colors';
import 'clsx';
import { i as isESMImportedImage, a as isLocalService, b as isRemoteImage, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_BlAMC9Ut.mjs';

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_BlAMC9Ut.mjs'
    ).then(n => n.g).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "D:/a/ed-portfolio/node_modules/astro/components/Image.astro", void 0);

const $$Astro$5 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionaAttributes = {};
  if (props.sizes) {
    sourceAdditionaAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionaAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "D:/a/ed-portfolio/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					new URL("file:///D:/a/ed-portfolio/.vercel/output/static/");
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$4 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${maybeRenderHead()}<div class="fixed top-8 left-0 right-0 max-sm:max-w-[330px] max-w-[400px] p-2 mx-auto rounded-full shadow bg-slate-950 bg-opacity-40 backdrop-blur-sm z-10"> <nav class="py-1 border-[1px] rounded-full mx-auto border-slate-500"> <ul class="flex text-sm md:text-base items-enter font-bold text-white justify-around bg-yellow-100 bg-clip-text text-opacity-0"> <li class="cursor-pointer hover:text-slate-200"> <a href="/">Home</a> </li> <li class="cursor-pointer hover:text-slate-200"> <a href="/proyectos">Proyectos</a> </li> <li class="cursor-pointer hover:text-slate-200"> <a href="/contact">Contacto</a> </li> </ul> </nav> </div>`;
}, "D:/a/ed-portfolio/src/components/nav.astro", void 0);

const $$Astro$3 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "D:/a/ed-portfolio/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es-PY"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", "</title>", "", '</head> <body class="text-yellow-50 font-medium mt-12 max-w-screen-lg mx-auto w-11/12 antialiased selection:bg-yellow-50 selection:text-slate-800"> <header> ', ' </header> <div class="fixed left-0 top-0 -z-10 h-full w-full"> <div class="relative h-full w-full bg-slate-950 bg-slate"> <div class="move absolute bottom-0 left-[0] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(69,87,189,0.15),rgba(255,255,255,0))]"></div><div class="move absolute bottom-0 hidden md:block right-[-0%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(69,87,189,0.15),rgba(255,255,255,0))]"></div> </div> </div> <div class="relative animate-fade mt-36"> ', ' </div>  <!-- <script>\n      import gsap from "gsap";\n      function getRandomPosition(max: number) {\n        return Math.floor(Math.random() * max);\n      }\n\n      function animateToRandomPosition() {\n        const maxX = 200;\n        const maxY = 200;\n\n        gsap.to(".move", {\n          duration: 2,\n          ease: "sine.out",\n          x: getRandomPosition(maxX),\n          y: getRandomPosition(maxY),\n          onComplete: animateToRandomPosition,\n        });\n      }\n\n      animateToRandomPosition();\n\n      gsap.fromTo(\n        ".ed",\n        {\n          y: 5,\n        },\n        {\n          y: -5,\n          repeat: -1,\n          yoyo: true,\n          ease: "sine.inOut",\n          duration: 3,\n        }\n      );\n    <\/script> --> </body></html>'])), addAttribute(Astro2.generator, "content"), title, renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead(), renderComponent($$result, "Nav", $$Nav, {}), renderSlot($$result, $$slots["default"]));
}, "D:/a/ed-portfolio/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const projectData = [
  {
    id: 1,
    title: "SPS",
    description: "Servicio a la Protecci\xF3n de la Salud, es la Medicina Prepaga de socios y socias de Coomecipar Ltda., con el fin de brindar un servicio integral, efectivo, con \xF3ptima atenci\xF3n, de alta calidad.",
    image: "/assets/proyectos/sps.webp",
    svg1: "/assets/Astro.svg",
    svg3: "/assets/typescript.svg",
    svg2: "/assets/tailwind-css-2.svg",
    link: "https://www.sps.org.py/"
  },
  {
    id: 2,
    title: "Distribuidora Cacique",
    description: "Venta de articulos varios minoristas y distribuci\xF3n de productos en hierro en a todo el pa\xEDs.",
    image: "/assets/proyectos/distribuidora.webp",
    svg1: "/assets/next-js.svg",
    svg3: "/assets/typescript.svg",
    svg2: "/assets/tailwind-css-2.svg",
    link: "https://www.distribuidoracacique.com.py/"
  },
  {
    id: 3,
    title: "Seguridad Seguros - Quiz Game",
    description: "Juego de preguntas y respuestas a pedido de la empresa Seguridad Seguros.",
    image: "/assets/proyectos/ss-quiz.webp",
    svg1: "/assets/react-2.svg",
    link: "https://quiz-boss.vercel.app/"
  },
  {
    id: 4,
    title: "Gamarra K\xF6hn",
    description: "Gamarra K\xF6hn es una inmobiliaria que ofrece un servicio de intermediaci\xF3n de compra - venta - alquiler de inmuebles; estrategias de marketing y publicidad diferenciada.",
    image: "/assets/proyectos/Gk.webp",
    svg1: "/assets/next-js.svg",
    svg3: "/assets/typescript.svg",
    svg2: "/assets/tailwind-css-2.svg",
    link: "https://gki-2024.vercel.app/"
  },
  {
    id: 5,
    title: "Interamerica Group",
    description: "Interamerica es un grupo empresarial dedicado a la logi\u0301stica en comercio exterior li\u0301der en el mercado paraguayo.",
    image: "/assets/proyectos/interamerica.webp",
    svg1: "/assets/next-js.svg",
    svg2: "/assets/typescript.svg",
    svg3: "/assets/tailwind-css-2.svg",
    link: "https://interamerica.vercel.app/"
  },
  {
    id: 6,
    title: "Portfolio Analimenza",
    description: "Portfolio a pedido de Ana Limenza, Licenciada en Psicolog\xEDa Laboral, egresada de la Facultad Nacional de Asunci\xF3n. Coach Ontol\xF3gico Profesional certificada por YOICA.",
    image: "/assets/proyectos/analimenza.webp",
    svg1: "/assets/html-1.svg",
    svg3: "/assets/logo-javascript.svg",
    svg2: "/assets/tailwind-css-2.svg",
    link: "https://analimenza.com.py/"
  },
  {
    id: 7,
    title: "Taurus Centro Gen\xE9tico",
    description: "Empresa nacional privada compuesta por ganaderos y te\u0301cnicos reconocidos en el a\u0301mbito nacional e internacional.",
    image: "/assets/proyectos/taurus.webp",
    svg1: "/assets/next-js.svg",
    svg3: "/assets/typescript.svg",
    svg2: "/assets/tailwind-css-2.svg",
    link: "https://taurus-kappa.vercel.app/"
  }
];
const $$ProjectData = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectData;
  return renderTemplate``;
}, "D:/a/ed-portfolio/src/components/projectData.astro", void 0);

const $$Astro = createAstro();
const $$proyecto = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$proyecto;
  const { proyecto } = Astro2.params;
  const info = projectData.find((item) => item.id === Number(proyecto));
  if (!info)
    return Astro2.redirect("/");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Proyecto: ${info.title}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section${addAttribute(`view-transition-name: form`, "style")} class="max-w-3xl mx-auto"> <h1${addAttribute(`view-transition-name: title-${info.id} view-transition-name: title`, "style")} class="text-center font-bold text-4xl mb-12"> ${info.title} </h1> <div${addAttribute(`view-transition-name: svg-${info.id}`, "style")} class="flex gap-x-2 mb-6"> ${info.svg2 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Image", $$Image, { "src": info.svg1, "height": 30, "width": 30, "alt": "" })} ${renderComponent($$result3, "Image", $$Image, { "src": info.svg2, "height": 30, "width": 30, "alt": "" })} ` })}`} ${info.svg3 && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": info.svg3, "height": 30, "width": 30, "alt": "" })}`} </div> <p class="text-yellow-50">Click en la imagen para ir al sitio.</p> <a${addAttribute(info.link, "href")} target="_blank"> ${renderComponent($$result2, "Image", $$Image, { "width": 800, "height": 600, "src": info.image, "alt": `Proyecto: ${info.image}`, "class": "mx-auto lg:aspect-[600px/800px] rounded hover:shadow-xl transition-all hover:shadow-slate-800 cursor-pointer mb-6 shadow", "style": `view-transition-name: image-${info.id}` })} </a> <div class="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-md shadow text-pretty"> <p${addAttribute(`view-transition-name: description-${info.id} view-transition-name: form`, "style")} class="text-lg mb-12"> ${info.description} </p> </div> </section> ` })}`;
}, "D:/a/ed-portfolio/src/pages/proyectos/[proyecto].astro", void 0);

const $$file = "D:/a/ed-portfolio/src/pages/proyectos/[proyecto].astro";
const $$url = "/proyectos/[proyecto]";

const _proyecto_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$proyecto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _proyecto_ as _, $$Image as a, getConfiguredImageService as g, imageConfig as i, projectData as p };
