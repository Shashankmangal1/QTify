import { useState } from "react";
import searchIcon from "../../assets/search-icon.svg";
import styles from "./Search.module.css";
import navbarStyles from "../Navbar/Navbar.module.css";

const Search = ({ data, page }) => {
  let [value, setValue] = useState("");
  let [search, setSearch] = useState([]);
  const handleInput = (e) => {
    const next = e.target.value;
    setValue(next);

    // guard data in case it's undefined or not an array
    const source = Array.isArray(data) ? data : [];
    const arr = source.filter((album) => {
      return album.title && album.title.toLowerCase().includes(next.toLowerCase());
    });
    setSearch(arr);
  };

  const handleSubmit = (e) => {
    console.log("click");
  };
  return (
    <div>
      <div className={navbarStyles.searchField}>
        <input
          type="search"
          placeholder={
            page === "home"
              ? "Search an Album of Your Choice"
              : "Search a Song of Your Choice"
          }
          value={value}
          onChange={handleInput}
        />
        <div>
          <img
            src={searchIcon}
            alt="Search Icon"
            onClick={handleSubmit}
            className={styles.searchIcon}
          />
        </div>
      </div>
      <div className={styles.searchResultWrapper}>
        {value.length > 0 && (
          <div className={styles.searchResult}>
            {!search.length ? (
              <h1 className={styles.notFound}>No Match Found!</h1>
            ) : (
              search.map((album) => {
                return (
                  <div className={styles.albumWrapper} key={album.id}>
                    <div className={styles.imgWrapper}>
                      <img
                        src={album.image}
                        alt=""
                        className={styles.albumImg}
                      />
                    </div>

                    <div className={styles.albumHeadingWrapper}>
                      <p className={styles.albumTitle}>{album.title}</p>
                      <p className={styles.artists}>
                        {page === "home"
                          ? album.songs[0].artists.join(", ")
                          : album.artists.join(", ")}
                        .....
                      </p>
                    </div>
                    <div className={styles.followersWrapper}>
                      <p className={styles.followers}>
                        {page === "home" && album.follows && (
                          <>{(album.follows / 1000).toFixed(1)}k Follows</>
                        )}
                        {page === "song" && album.likes && (
                          <>{(album.likes / 1000).toFixed(1)}k💖</>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
