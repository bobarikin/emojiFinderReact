import { useState, useEffect } from "react";
import { Emojies } from "../Emojies/Emojies";
import { Pagination } from "../Pagination/Pagination";
import "./Main.css";

export function Main() {
  // эмоджи по фильтру
  const [emoji, setEmoji] = useState([]);
  // все эмоджи
  const [allEmoji, setAllEmoji] = useState([]);
  // состояние загрузки
  const [loading, setLoading] = useState(true);
  // текущая страничка
  const [currentPage, setCurrentPage] = useState(1);
  // количество эмоджи на странице
  const [emojiPerPage, setEmojiPerPage] = useState(12);

  // получение данных по api
  useEffect(() => {
    const getEmoji = async () => {
      const res = await fetch("https://emoji.ymatuhin.workers.dev/");
      const resData = await res.json();
      // const uniq = resData.map(emoji => {
      //   for (let key in emoji) {
      //     key === 'keywords' ? [...new Set(emoji.key.split(" "))].join(" ") : emoji.key;
      //   }
      //   return emoji;
      // });
      // console.log(uniq);
      setAllEmoji(resData);
      setEmoji(resData);
      setLoading(false);
    };

    getEmoji();
  }, []);

  // запрет скролла при переключении страниц
  useEffect(() => {
    document.documentElement.scrollTop = Number.MAX_SAFE_INTEGER;
  }, [currentPage]);

  // индекс последней эмоджи на странице
  const lastEmojiIndex = currentPage * emojiPerPage;
  // индекс первой эмоджи на странице
  const firstEmojiIndex = lastEmojiIndex - emojiPerPage;
  // эмоджи на текущей странице
  const currenEmoji = emoji.slice(firstEmojiIndex, lastEmojiIndex);
  // количество страниц
  const lastPage = Math.ceil(emoji.length / emojiPerPage);

  // поиск
  function searchEmoji(event) {
    let inputValue = event.target.value.trim();
    let filterEmoji = allEmoji.filter(
      (el) => el.keywords.includes(inputValue) || el.title.includes(inputValue)
    );
    setEmoji(filterEmoji);
  }

  return (
    <>
      <main>
        <input onInput={searchEmoji}></input>
        <Emojies emoji={currenEmoji} loading={loading} />
      </main>

      <Pagination
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <div>
        <select
          className="form-select form-select-sm"
          onChange={(event) => setEmojiPerPage(+event.target.value)}
        >
          <option defaultValue>Per Page</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>
    </>
  );
}
