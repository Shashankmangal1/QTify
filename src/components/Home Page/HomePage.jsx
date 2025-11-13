import React from "react";
import sectionStyles from "../Section/section.module.css";
import Hero from "../Hero/Hero";
import Navbar from "../Navbar/Navbar";
import Section from "../Section/Section";
import { useState, useEffect } from "react";
import {
  fetchTopAlbum,
  fetchNewAlbum,
  fetchSongs,
  fetchGenres,
} from "../../api/api";
import { FAQs } from "../FAQs/FAQs";
import Footer from "../Footer/Footer";
import AudioBar from "../Audio Bar/AudioBar";

function HomePage() {
  let [topAlbum, setTopAlbum] = useState([]);
  let [newAlbum, setNewAlbum] = useState([]);
  let [songs, setSongs] = useState([]);
  let [genres, setGeneres] = useState([]);
  useEffect(() => {
    (async () => {
      const topAlbumData = await fetchTopAlbum();
      setTopAlbum(Array.isArray(topAlbumData) ? topAlbumData : []);

      const newAlbumData = await fetchNewAlbum();
      setNewAlbum(Array.isArray(newAlbumData) ? newAlbumData : []);

      const fetchSongsData = await fetchSongs();
      setSongs(Array.isArray(fetchSongsData) ? fetchSongsData : []);

      const fetchSongsGenere = await fetchGenres();
      // fetchGenres returns res.data (array) on success; guard against error objects
      setGeneres(Array.isArray(fetchSongsGenere) ? fetchSongsGenere : []);
    })();
  }, []);

  return (
    <>
      {/* build nav data safely in case API returns non-array or error objects */}
      <Navbar
        data={[...(Array.isArray(topAlbum) ? topAlbum : []), ...(Array.isArray(newAlbum) ? newAlbum : [])]}
        page={"home"}
      />
      <Hero />
      <div className={sectionStyles.sectionWrapper}>
        <Section title="Top Albums" data={topAlbum} type="album" />
        <Section title="New Albums" data={newAlbum} type="album" />
        <hr />
        <Section title="Songs" data={songs} type="songs" genres={genres} />{" "}
        <hr />
      </div>{" "}
      <FAQs />
      <hr style={{ backgroundColor: "gray", border: "1px solid gray" }} />{" "}
      <Footer />
      <hr />
      <AudioBar song={{}} />
    </>
  );
}

export default HomePage;
