import { EmojiCard } from "../EmojuCard/EmojiCard";
import loading from "./img/loading.gif";

export function Emoji({ emoji, loading }) {
  const uniq = (keywords) => [...new Set(keywords.split(" "))].join(" ");

  if (loading) {
    console.log('here');
    return <img src={loading} alt="loading" />;
  }

  return (
    <>
      {emoji.map((emoji) => {
        return (
          <EmojiCard
            symbol={emoji.symbol}
            title={emoji.title}
            keywords={uniq(emoji.keywords)}
            key={emoji.title}
          />
        );
      })}
    </>
  );
}
