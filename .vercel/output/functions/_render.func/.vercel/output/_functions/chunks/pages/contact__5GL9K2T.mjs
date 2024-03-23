/* empty css                            */
import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead, h as addAttribute } from '../astro_SrnRbp6A.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './_proyecto__xdz8uwCx.mjs';

const $$Astro = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contacto" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto pb-12"> <form class="bg-slate-600 bg-opacity-20 mx-auto w-11/12 lg:w-4/5 rounded-xl border-[1px] border-slate-500 py-12" method="POST" action="https://formsubmit.co/eduardo.avg95@gmail.com"> <h1${addAttribute(`view-transition-name: title`, "style")} class="text-yellow-50 text-center text-4xl font-bold mb-6">
¡Deja un comentario! 😁
</h1> <div class="w-4/5 mx-auto flex flex-col max-w-md"${addAttribute(`view-transition-name: form`, "style")}> <label class="mb-2">Nombre:</label> <input type="text" name="name" class="mb-4 py-2 px-4 bg-transparent border-2 border-slate-200 rounded-md outline-0 focus:border-yellow-100 focus:border-4 transition-colors" required> <label class="mb-2">Email:</label> <input type="email" name="email" class="mb-4 py-2 px-4 bg-transparent border-2 border-slate-200 rounded-md outline-0 focus:border-yellow-100 focus:border-4 transition-colors" required> <label class="mb-2">Teléfono:</label> <input type="tel" name="number" class="mb-4 py-2 px-4 bg-transparent border-2 border-slate-200 rounded-md outline-0 focus:border-yellow-100 focus:border-4 transition-colors" required> <label class="mb-2">Mensaje</label> <textarea name="text" class="mb-6 py-2 px-4 bg-transparent border-2 caret-yellow-100 border-slate-200 rounded-md outline-0 focus:border-yellow-100 focus:border-4 transition-colors" required></textarea> <button type="submit" class="bg-slate-600 hover:bg-yellow-100 hover:text-slate-600 rounded-sm border-[1px] border-slate-500 hover:border-yellow-100 transition-colors">Enviar</button> </div> <input type="hidden" name="_next" value="https://edavg-portfolio-tau.vercel.app/"> <input type="hidden" name="_captcha" value="false"> </form> </section> ` })}`;
}, "D:/a/ed-portfolio/src/pages/contact.astro", void 0);

const $$file = "D:/a/ed-portfolio/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
