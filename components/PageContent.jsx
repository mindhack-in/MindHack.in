import parse from "html-react-parser";
import { Breadcrumbs } from "./Breadcrumbs";
import { GameFrame } from "./GameFrame";
import { GameGrid } from "./GameGrid";
import { VariantGrid } from "./VariantGrid";
import { ContactForm } from "./ContactForm";
import { styleStringToObject } from "@/lib/style";

/**
 * Renders a migrated page.
 *
 * The body HTML carries <!--@MARKER@--> comments where the original page had
 * interactive chrome. The document is parsed into a real element tree and each
 * marker comment is swapped for its React component in place, so the surrounding
 * nesting is preserved exactly as authored.
 *
 * (An earlier version split the raw HTML string on the markers and rendered the
 * pieces separately. That silently corrupted the DOM: a marker nested inside a
 * <section> left the opening tag unbalanced, the parser auto-closed it, and the
 * content escaped its wrapper — taking its CSS with it. Parse, don't split.)
 */
export function PageContent({ meta, html }) {
  const components = {
    BREADCRUMBS: () => <Breadcrumbs items={meta.breadcrumbs || []} />,
    GAMEFRAME: () => (
      <GameFrame
        gameLink={meta.gameLink}
        title={meta.gameFrame?.title}
        sectionStyle={styleStringToObject(meta.gameFrame?.iframeStyle)}
        size={meta.size}
      />
    ),
    GAMEGRID: () => (
      <GameGrid
        variant={meta.pageType === "home" ? "home" : "all"}
        exclude={meta.excludeGame}
      />
    ),
    VARIANTGRID: () => <VariantGrid set={meta.variantSet} />,
    CONTACTFORM: () => <ContactForm />,
  };

  return parse(html, {
    replace(node) {
      if (node.type !== "comment") return undefined;
      const match = /^@([A-Z]+)@$/.exec((node.data || "").trim());
      if (!match) return undefined;
      const Component = components[match[1]];
      return Component ? <Component /> : <></>;
    },
  });
}
