import { useState, useEffect } from "react";
import { Header } from "./Components/Header/Header.js";
import { Main } from "./Components/Main/Main.js";
import { Spinner } from "./Components/Spinner/Spinner";

function App() {
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
      const unicEmojies = resData.map((emoji) => {
        return {
          ...emoji,
          keywords: [...new Set(emoji.keywords.split(" "))].join(" "),
        };
      });
      setAllEmoji(unicEmojies);
      setEmoji(unicEmojies);
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

  // переменные для хранения крайних номеров страниц для пагинации
  let startPage = 0;
  let endPage = lastPage;

  if (currentPage === 1 || currentPage === 2) {
    startPage = 0;
    endPage = 5;
  } else if (
    currentPage === lastPage ||
    currentPage === lastPage - 1 ||
    currentPage === lastPage - 2
  ) {
    startPage = lastPage - 5;
    endPage = lastPage;
  } else if (currentPage > 2) {
    startPage = currentPage - 3;
    endPage = currentPage + 2;
  }

  // поиск
  function searchEmoji(event) {
    let inputValue = event.target.value.trim();
    let searchValues = inputValue.split(" ");
    let newDataEmojies = allEmoji;

    searchValues.forEach((inputWord) => {
      newDataEmojies = newDataEmojies.filter((emoji) =>
        emoji.keywords.includes(inputWord)
      );
    });

    setEmoji(newDataEmojies);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <Main
          searchEmoji={searchEmoji}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setEmojiPerPage={setEmojiPerPage}
          currenEmoji={currenEmoji}
          startPage={startPage}
          endPage={endPage}
        />
      )}
    </div>
  );
}

export default App;
