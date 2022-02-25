import { EmojiCard } from "../EmojiCard/EmojiCard";

export function Emojies({ emoji, loading }) {
  // вызвать один раз а не много раз в самом начале когда принимаем данные
  const uniq = (keywords) => [...new Set(keywords.split(" "))].join(" ");
//сделать отдельный компонент спинера в родительском компоненте
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
