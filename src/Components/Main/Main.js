import { Emojies } from "../Emojies/Emojies";
import { Pagination } from "../Pagination/Pagination";
import "./Main.css";

export function Main(props) {
  const {
    searchEmoji,
    currenEmoji,
    lastPage,
    setCurrentPage,
    currentPage,
    setEmojiPerPage,
    startPage,
    endPage,
  } = props;

  return (
    <>
      <main className="container-size">
        <input
          placeholder="Enter emojis for search"
          onInput={searchEmoji}
        ></input>
        <Emojies emoji={currenEmoji} />
      </main>
      <hr className="container-size hr_bottom" />
      <footer className="container-size">
        <Pagination
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          startPage={startPage}
          endPage={endPage}
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
      </footer>
    </>
  );
}
