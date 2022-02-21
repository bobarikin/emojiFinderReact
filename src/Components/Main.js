import { useState, useEffect } from "react";
import { Emoji } from "./Emoji/Emoji";

export function Main() {
  const [emoji, setEmoji] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [emojiPerPage, setEmojiPerPage] = useState(20);

  useEffect(() => {
    const getEmoji = async () => {
      setLoading(true);
      const res = await fetch("https://emoji.ymatuhin.workers.dev/");
      const resData = await res.json();
      setEmoji(resData);
      setLoading(false);
    };

    getEmoji();
  }, []);

  function searchEmoji(event) {
    let inputValue = event.target.value.trim();
    let filterEmoji = emoji.filter(
      (el) =>
        el.keywords.indexOf(inputValue) >= 0 ||
        el.title.indexOf(inputValue) >= 0
    );
    setEmoji(filterEmoji);
  }

  // return { loading } ? (
  //   <h2>Loading...</h2>
  // ) : (
  //   <main>
  //     <input onInput={searchEmoji}></input>
  //     {emoji.map((emoji) => {
  //       return (
  //         <EmojiCard
  //           symbol={emoji.symbol}
  //           title={emoji.title}
  //           keywords={uniq(emoji.keywords)}
  //           key={emoji.title}
  //         />
  //       );
  //     })}
  //   </main>
  // );
  return (
    <main>
      <input onInput={searchEmoji}></input>
      <Emoji emoji={emoji} loading={loading} />
    </main>
  );
}
