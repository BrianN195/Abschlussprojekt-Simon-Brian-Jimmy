import { useEffect, useState } from "react";

type Props = {
  src: string;
  className?: string;
  ariaLabel?: string;
};

export default function InlineSVG({ src, className, ariaLabel }: Props) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to load SVG");
        const text = await res.text();
        if (!cancelled) setSvg(text);
      } catch (e) {
        console.error("InlineSVG load error:", e);
        if (!cancelled) setSvg(null);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (svg === null) {
    // fallback empty element while loading or on error
    return <div className={className} aria-label={ariaLabel} />;
  }

  return (
    <div
      className={className}
      aria-label={ariaLabel}
      // SVG comes from our public folder; this is a controlled case
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
