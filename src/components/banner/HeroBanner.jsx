import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { getPoster } from "../../utils/helpers";

function HeroBanner({ movies = [] }) {
  if (!movies.length) return null;

  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      slidesPerView={3}
      spaceBetween={20}
      loop
      speed={5000}
      freeMode
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="rounded-2xl overflow-hidden"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.imdbID}>
          <Link to={`/movie/${movie.imdbID}`}>
            <div
              className="h-[320px] md:h-[420px] bg-cover bg-center relative flex items-end p-6 md:p-8"
              style={{ backgroundImage: `url(${getPoster(movie.Poster, "1280x720")})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              <div className="relative z-10 max-w-2xl">
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-300">Featured</p>
                <h2 className="text-2xl md:text-4xl font-bold mt-2">{movie.Title}</h2>
                <p className="text-sm md:text-base text-gray-200 mt-2">{movie.Year}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroBanner;
