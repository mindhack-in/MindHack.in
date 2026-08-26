/** Converts an inline style string from the migrated HTML into a React style object. */
export function styleStringToObject(styleString) {
  if (!styleString) return undefined;
  const out = {};
  for (const declaration of styleString.split(";")) {
    const [rawProp, ...rest] = declaration.split(":");
    if (!rawProp || !rest.length) continue;
    const prop = rawProp.trim();
    if (!prop) continue;
    const camel = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = rest.join(":").trim();
  }
  return Object.keys(out).length ? out : undefined;
}
