import Link from "next/link";
import { env } from "@/lib/env";
import { games, HOME_GAME_COUNT } from "@/data/games";

/**
 * The game card grid. Replaces the client-side DOM building in the old
 * utility/js/games.js — now server-rendered, so crawlers see the cards and
 * their links in the HTML instead of an empty <div>.
 *
 * Card artwork resolves against DYNAMIC_RESOURCE from .env.
 */
export function GameGrid({ variant = "all", exclude = null }) {
  const isHome = variant === "home";
  const visible = (isHome ? games.slice(0, HOME_GAME_COUNT) : games).filter(
    (game) => game.name !== exclude
  );

  return (
    <div className="games-grid" id="games-grid">
      {visible.map((game) => (
        <div className="game-card" key={game.name}>
          <img
            src={env.DYNAMIC_RESOURCE + game.img}
            className="game-img"
            alt={game.alt || game.anchorText || game.name}
            loading="lazy"
          />
          <h3>{game.name}</h3>
          <p>{game.description}</p>
          <Link className="play-btn" href={"/" + game.link}>
            {game.anchorText || "Play now"} <i className="fas fa-chevron-right" />
          </Link>
        </div>
      ))}

      {isHome ? (
        <div className="game-card">
          <h3>View All Games</h3>
          <p>View our full collection of games and find your next favorite!</p>
          <Link className="play-btn" href="/games/">
            Browse All Games <i className="fas fa-chevron-right" />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
