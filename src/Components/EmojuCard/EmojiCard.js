export function EmojiCard({ symbol, title, keywords }) {
  return (
    <div className="emoji-card">
      <div className="emoji-card__symbol">{symbol}</div>
      <div className="emoji-card__title">{title}</div>
      <p className="emoji-card__keywords">{keywords}</p>
    </div>
  );
}
