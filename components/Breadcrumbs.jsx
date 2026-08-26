import Link from "next/link";

/** Visual breadcrumb trail. The matching BreadcrumbList schema ships via JsonLd. */
export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={item.label + i}
              className={"breadcrumb-item" + (isLast ? " active" : "")}
              aria-current={isLast ? "page" : undefined}
            >
              {item.href && !isLast ? <Link href={item.href}>{item.label}</Link> : item.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
