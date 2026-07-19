import { focusRing } from "@/components/ui";
import type { FooterProps } from "@/lib/types";

export function Footer({ restaurant }: FooterProps) {
  const instagramHandle = restaurant.instagram.replace("@", "");

  return (
    <footer className="mt-16 border-t border-stone-200/80 bg-espresso px-4 py-10 text-stone-200 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-white">{restaurant.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-400">
            {restaurant.tagline}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            Visit
          </h2>
          <address className="mt-3 not-italic text-sm leading-relaxed text-stone-300">
            {restaurant.address}
          </address>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-light">
            Contact
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
                className={`${focusRing()} text-stone-200 underline-offset-4 hover:text-white hover:underline`}
              >
                {restaurant.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${focusRing()} text-stone-200 underline-offset-4 hover:text-white hover:underline`}
              >
                {restaurant.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-5xl text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {restaurant.name}. All prices in EUR.
      </p>
    </footer>
  );
}
