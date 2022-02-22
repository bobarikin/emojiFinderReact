import { EmojiCard } from "../EmojiCard/EmojiCard";

export function Emoji({ emoji, loading }) {
  const uniq = (keywords) => [...new Set(keywords.split(" "))].join(" ");

  if (loading) {
    return (
      <>
        <div></div>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <div></div>
      </>
    );
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
