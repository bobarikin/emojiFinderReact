import './EmojiCard.css';

type Props = {
  symbol: string,
  title: string,
  keywords: string
}

export function EmojiCard({ symbol, title, keywords }: Props) {
  return (
    <div className="emoji-card">
      <div className="emoji-card__symbol">{symbol}</div>
      <div className="emoji-card__title">{title}</div>
      <p className="emoji-card__keywords mx-3">{keywords}</p>
    </div>
  );
}
