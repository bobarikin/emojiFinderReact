import { useState, useEffect } from "react";
import { Emoji } from "../Emoji/Emoji";
import { Pagination } from "../Pagination/Pagination";
import("./Main.css");

export function Main() {
  // эмоджи по фильтру
  const [emoji, setEmoji] = useState([]);
  // все эмоджи
  const [allEmoji, setAllEmoji] = useState([]);
  // состояние загрузки
  const [loading, setLoading] = useState(false);
  // текущая страничка
  const [currentPage, setCurrentPage] = useState(1);
  // количество эмоджи на странице
  const [emojiPerPage, setEmojiPerPage] = useState(12);

  // получение данных по api
  useEffect(() => {
    const getEmoji = async () => {
      setLoading(true);
      const res = await fetch("https://emoji.ymatuhin.workers.dev/");
      const resData = await res.json();
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

  const lastPage = Math.ceil(emoji.length / emojiPerPage);

  // рендер эмоджи на текущей странице
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // следующая страница
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  // предыдущая страница
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  // поиск
  function searchEmoji(event) {
    let inputValue = event.target.value.trim();
    let filterEmoji = allEmoji.filter(
      (el) =>
        el.keywords.indexOf(inputValue) >= 0 ||
        el.title.indexOf(inputValue) >= 0
    );
    setEmoji(filterEmoji);
  }

  return (
    <>
      <main>
        <input onInput={searchEmoji}></input>
        <Emoji emoji={currenEmoji} loading={loading} />
      </main>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            disabled={currentPage === 1}
            className="btn"
            onClick={prevPage}
          >
            Prev
          </button>
          <Pagination
            lastPage={lastPage}
            paginate={paginate}
            currentPage={currentPage}
          />
          <button
            disabled={currentPage === lastPage}
            className="btn"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <div>
          <select
            className="form-select form-select-sm"
            onChange={(event) => setEmojiPerPage(+event.target.value)}
          >
            <option selected>Per Page</option>
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
    </>
  );
}
