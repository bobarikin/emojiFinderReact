import { EmojiCard } from "../EmojiCard/EmojiCard.tsx";

export function Emojies({ emoji }) {
  return (
    <>
      {emoji.map((emoji) => {
        return (
          <EmojiCard
            symbol={emoji.symbol}
            title={emoji.title}
            keywords={emoji.keywords}
            key={emoji.title}
          />
        );
      })}
    </>
  );
}
