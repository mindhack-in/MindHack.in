import Link from "next/link";
import { env } from "@/lib/env";
import { variantSets } from "@/data/variants";

/**
 * The inner grid on a game hub page (board sizes, card themes).
 *
 * Replaces the page-local scripts that built these cards client-side with
 * <button> + window.location navigation — invisible to crawlers. Real <a>
 * elements mean the 24 variant pages finally have inbound internal links.
 */
export function VariantGrid({ set }) {
  const variants = variantSets[set];
  if (!variants) return null;

  return (
    <div className="games-grid" id="inner-games-grid">
      {variants.map((variant) => (
        <div className="game-card" key={variant.link}>
          {variant.showImage === false ? null : (
            <img
              src={env.DYNAMIC_RESOURCE + variant.img}
              className="game-img"
              alt={variant.alt}
              loading="lazy"
            />
          )}
          <h3>{variant.name}</h3>
          <p>{variant.description}</p>
          <Link className="play-btn" href={variant.link}>
            {variant.anchorText} <i className="fas fa-chevron-right" />
          </Link>
        </div>
      ))}
    </div>
  );
}
