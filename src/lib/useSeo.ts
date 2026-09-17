import { useEffect } from "react";

export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | Courage To Claws`;
    const set = (sel: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement("meta");
        const [k, v] = attr.split("=");
        el.setAttribute(k, v.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    set('meta[name="description"]', 'name="description"', description);
    set('meta[property="og:title"]', 'property="og:title"', `${title} | Courage To Claws`);
    set('meta[property="og:description"]', 'property="og:description"', description);
  }, [title, description]);
}
