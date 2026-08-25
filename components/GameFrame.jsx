"use client";

import { useEffect, useRef, useState } from "react";
import { useEnv } from "./EnvProvider";

/**
 * Embeds a playable game and reproduces the original "game mode" behaviour:
 * when the iframe takes focus, the page scrolls it into view, locks background
 * scrolling and shows an exit button.
 *
 * The iframe host comes from IFRAME_LINK in .env.
 */
export function GameFrame({ gameLink, title, sectionStyle, size }) {
  const { iframeLink } = useEnv();
  const iframeRef = useRef(null);
  const [inGameMode, setInGameMode] = useState(false);
  const src = gameLink ? iframeLink + gameLink : undefined;

  // The page is server-rendered with the iframe's `src` already in the HTML
  // (good for a fast first paint), which means the browser can start — and
  // for a cached/fast response, finish — loading the iframe before React
  // has hydrated and attached the size-handshake onLoad handler below. A
  // handler wired up only on the *next* load would then miss the message
  // entirely, which is exactly what broke the Rubik's Cube timer: it never
  // received its size and silently fell back to a 0x0 board. So only when a
  // size handshake is actually needed, hold the real `src` back until after
  // mount — React attaches onLoad in the same commit that creates the node,
  // before this effect can run, guaranteeing the listener is live before the
  // fetch that triggers "load" ever starts. Games without a size handshake
  // keep the immediate SSR'd src (no race to avoid, no reason to delay).
  const [frameSrc, setFrameSrc] = useState(size ? undefined : src);
  useEffect(() => {
    if (size) setFrameSrc(src);
  }, [size, src]);

  // Some embedded games (the Rubik's Cube timer) are one shared app served
  // at a single URL for every variant page; the parent tells it which size
  // to render by posting a message once the iframe has loaded — mirrors the
  // original utility/js/iframutility.js.
  function handleGameFrameLoad() {
    if (!size) return;
    iframeRef.current?.contentWindow?.postMessage({ size }, iframeLink + gameLink);
  }

  useEffect(() => {
    function handleBlur() {
      // A short delay lets the browser settle activeElement after the blur.
      setTimeout(() => {
        if (document.activeElement !== iframeRef.current) return;
        iframeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        setInGameMode(true);
        setTimeout(() => {
          document.querySelector(".page-content")?.classList.add("scroll-locked");
        }, 500);
      }, 50);
    }

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
      document.querySelector(".page-content")?.classList.remove("scroll-locked");
    };
  }, []);

  function exitGameMode() {
    document.querySelector(".page-content")?.classList.remove("scroll-locked");
    setInGameMode(false);
    window.focus();
  }

  return (
    <section className="iframe-section" style={sectionStyle}>
      <button
        id="exit-game-btn"
        className="exit-game-btn"
        onClick={exitGameMode}
        style={{ display: inGameMode ? "block" : "none" }}
        aria-label="Exit game"
      >
        <i className="fas fa-times" />
      </button>
      <iframe
        ref={iframeRef}
        id="game-link-iframe"
        title={title || "Game"}
        className="game-iframe"
        src={frameSrc}
        loading="lazy"
        onLoad={handleGameFrameLoad}
      />
    </section>
  );
}
