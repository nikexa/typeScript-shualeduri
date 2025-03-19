import rame from "/rame.png";
import allActive from "/allActive.png";
import all from "/all.png";
import movies from "/movies.png";
import moviesActive from "/moviesActive.png";
import tvActive from "/tvActive.png";
import tv from "/tv.png";
import favorite from "/favorite.png";
import favoriteActive from "/favoriteActive.png";
import pfp from "/pfp.png";
import { useEffect, useState } from "react";
import data from "../../../data.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/swiper-bundle.css";

import "../../index.css";

const Home = () => {
  const [allA, setAll] = useState(true);
  const [moviesA, setMovies] = useState(false);
  const [tvA, setTv] = useState(false);
  const [favoriteA, setFavorite] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [favites, setFavoritee] = useState<any[]>([]);
  const [input, setInput] = useState("");

  function SetMOvies() {
    setMovies(true);
    setAll(false);
    setTv(false);
    setFavorite(false);
    setFilteredData(data.filter((item) => item.category.includes("Movie")));
  }

  function SetTv() {
    setMovies(false);
    setAll(false);
    setTv(true);
    setFavorite(false);
    setFilteredData(data.filter((item) => item.category.includes("TV")));
  }

  function SetFavorite() {
    setMovies(false);
    setAll(false);
    setTv(false);
    setFavorite(true);
    setFilteredData(favites);
  }

  function SetAll() {
    setMovies(false);
    setAll(true);
    setTv(false);
    setFavorite(false);
    setFilteredData(data);
  }

  function handleAddToFavorites(item: any) {
    setFavoritee((prev: any) => {
      if (prev.includes(item)) {
        return prev.filter((favItem: any) => favItem !== item);
      } else {
        return [...prev, item];
      }
    });
  }

  useEffect(() => {
    if (input.trim() === "") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => item.title.toLowerCase().includes(input))
      );
    }
  }, [input]);

  return (
    <div className="w-full min-h-screen bg-[#10141E] flex max-md:flex-col">
      <div className="w-[96px] h-[960px] bg-[#161D2F] rounded-[20px] flex flex-col items-center pt-10 mt-10 ml-6 justify-between max-md:w-[95%] max-md:h-[72px] max-md:flex-row max-md:justify-between max-md:p-0 max-sm:ml-2">
        <div className="max-md:flex max-md:items-center max-md:justify-evenly max-md:w-full">
          <button
            onClick={SetAll}
            className="cursor-pointer max-md:ml-[-130px] max-sm:ml-[-20px]"
          >
            <img src={rame} alt="" />
          </button>
          <div className="flex flex-col gap-10 mt-20 items-center max-md:flex-row max-md:mt-0">
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={SetAll}
            >
              <img src={allA ? allActive : all} alt="" />
            </button>
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={SetMOvies}
            >
              <img src={moviesA ? moviesActive : movies} alt="" />
            </button>
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={SetTv}
            >
              <img src={tvA ? tvActive : tv} alt="" />
            </button>
            <button
              className="w-[20px] h-[20px] cursor-pointer"
              onClick={SetFavorite}
            >
              <img src={favoriteA ? favoriteActive : favorite} alt="" />
            </button>
          </div>
        </div>

        <div className="mb-10 cursor-pointer max-md:mb-0 max-md:mr-10">
          <img src={pfp} alt="" />
        </div>
      </div>

      <div className="w-[90%] px-20 max-2xl:px-10 max-lg:px-10 max-lg:pl-10 max-md:w-full">
        {allA && (
          <>
            <div className="w-full flex items-center gap-7 mt-20 mb-10">
              <i className="fa-solid fa-magnifying-glass text-white text-[20px]"></i>
              <input
                className="h-[30px] w-[330px] outline-0 opacity-50 font-normal text-[24px] text-white"
                onChange={(e) => setInput(e.currentTarget.value)}
                type="text"
                placeholder="Search for movies or TV series"
              />
            </div>

            <p className="font-normal text-[32px] text-white w-[100px]">
              Trending
            </p>

            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              modules={[Pagination]}
              loop={true}
              className="mySwiper mt-10"
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 1,
                },
                400: {
                  slidesPerView: 0.9,
                },
              }}
            >
              {data
                .filter((item) => item.isTrending)
                .map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative">
                      <img
                        className="w-[470px] h-[230px]"
                        src={item.thumbnail.regular.large}
                        alt=""
                      />
                      <div
                        onClick={() => handleAddToFavorites(item)}
                        className="bg-[#10141E] cursor-pointer text-white hover:bg-white hover:text-[#10141E] w-[32px] h-[32px] rounded-[50%] absolute top-5 right-5 flex items-center justify-center"
                      >
                        <i
                          className={`fa-regular fa-bookmark ${
                            favites.includes(item) ? "fa-solid fa-bookmark" : ""
                          }`}
                        ></i>
                      </div>

                      <div className="flex absolute items-center gap-4 bottom-14 left-10 ">
                        <p className="font-normal text-[13px] text-white">
                          {item.year}
                        </p>
                        <div className="w-[3px] h-[3px] rounded-[50%] opacity-50 bg-white"></div>
                        <img
                          className="w-[12px] h-[12px]"
                          src={item.category === "Movie" ? movies : tv}
                          alt=""
                        />
                        <p className="font-normal text-[13px] text-white">
                          {item.category}
                        </p>
                        <div className="w-[3px] h-[3px] rounded-[50%] opacity-50 bg-white"></div>
                        <p className="font-normal text-[13px] text-white">
                          {item.rating}
                        </p>
                      </div>

                      <p className="font-normal text-[18px] text-white absolute bottom-7 left-10">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        )}

        <p
          className={`font-normal text-[32px] text-white mb-10 w-[400px] ${
            !allA && "mt-20"
          }`}
        >
          {(allA && "Recommended for you") ||
            (tvA && "TV Series") ||
            (favoriteA && "Bookmarked") ||
            (moviesA && "Movies")}
        </p>
        <div className="grid grid-cols-4 gap-10 justify-self-center max-2xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredData.map((item, i) => (
            <div className="w-[280px] h-[226px] flex flex-col mb-7" key={i}>
              <div className="mb-1 relative">
                <img
                  className="w-[280px] h-[174px] rounded-lg"
                  src={item.thumbnail.regular.large}
                  alt=""
                />
                <div
                  onClick={() => handleAddToFavorites(item)}
                  className="bg-[#10141E] cursor-pointer text-white hover:bg-white hover:text-[#10141E] w-[32px] h-[32px] rounded-[50%] absolute top-5 right-5 flex items-center justify-center"
                >
                  <i
                    className={`fa-regular fa-bookmark ${
                      favites.includes(item) ? "fa-solid fa-bookmark" : ""
                    }`}
                  ></i>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-normal text-[13px] text-white">
                  {item.year}
                </p>
                <div className="w-[3px] h-[3px] rounded-[50%] opacity-50 bg-white"></div>
                <img
                  className="w-[12px] h-[12px]"
                  src={item.category === "Movie" ? movies : tv}
                  alt=""
                />
                <p className="font-normal text-[13px] text-white">
                  {item.category}
                </p>
                <div className="w-[3px] h-[3px] rounded-[50%] opacity-50 bg-white"></div>
                <p className="font-normal text-[13px] text-white">
                  {item.rating}
                </p>
              </div>
              <p className="font-normal text-[18px] text-white">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
