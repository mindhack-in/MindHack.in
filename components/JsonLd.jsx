/**
 * Renders the structured-data blocks carried over from the original pages.
 * URLs inside them were tokenized during migration and resolved from .env.
 */

/**
 * `<` is escaped so a stray "</script>" inside any content string cannot break
 * out of the script element. JSON-LD consumers unescape \u003c transparently.
 */
function serialize(block) {
  return JSON.stringify(block).replace(/</g, "\\u003c");
}

export function JsonLd({ blocks = [] }) {
  if (!blocks.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(block) }}
        />
      ))}
    </>
  );
}
