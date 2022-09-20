import { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { ArrowFatLeft, ArrowFatRight, ArrowLeft, ArrowRight } from 'phosphor-react';
import { GameBanner } from "./GameBanner"

interface CarouselProps{
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function GamesCarousel({ items }: { items: CarouselProps[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: 6,
      spacing: 16
    },
    breakpoints: {
      "(min-width: 700px)": {
        slides: {
          perView: 4,
          spacing: 16,
        },
      },
      "(min-width: 300px)":{
        slides: {
          perView: 2,
          spacing: 8,
        },
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 5,
          spacing: 16,
        },
      },
      "(min-width: 1300px)": {
        slides: {
          perView: 6,
          spacing: 16,
        },
      },
    },
    loop: true,
    
    created() {
      setLoaded(true);
    }
  })

  return(
    <div className='navigation-wrapper relative w-[100%] px-0 md:px-12'> 
      {items.length > 0 && (
        <div ref={sliderRef} className='keen-slider'>
          {items.map(game => {
            return(
              <div className='keen-slider__slide rounded-lg' key={ game.id}>
                
                <GameBanner       
                  title={game.title}
                  bannerUrl={game.bannerUrl} 
                  adsCount={game._count.ads}
                />
              </div>
            )
          })}
        </div>
      )}  
      
      
      {loaded && instanceRef.current && (
          <>
            <Arrow
            left
              onClick={(e: any) => 
                e.stopPropagation() || instanceRef.current?.prev()
              } 
              disabled ={currentSlide === 0}
            />
            <Arrow 
              onClick={(e: any) => 
                e.stopPropagation() || instanceRef.current?.next()
              } 
              disabled={
                currentSlide ===
                3
              }
            />
          </>
        )}
    </div>
  )
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  const [hoverColor,setHoverColor] = useState("");
  function randomColor() {
    const colors = ["hover:text-[#9572FC]", "hover:text-[#43E7AD]", "hover:text-[#E2D45C]" ]
    const randomIndex = Math.floor(Math.random() * 3)
    setHoverColor(colors[randomIndex]);
  }
  return (
    <button
      onClick={props.onClick}
      onMouseEnter={randomColor}
      className={`hidden md:block content-[''] absolute top-2/4 cursor-pointer md:w-12 md:h-12 sm:w-8 sm:h-8 -translate-x-1/2 -translate-y-2/4 ${hoverColor} transition-all duration-300 z-10 text-white ${
        props.left ? "arrow--left left-[6%] lg:left-[1.4%]" : "arrow--right left-auto lg:right-[-1.7%] md:right-[0%] right-[-2.5%]"
      } ${disabled}`}
    >
      {props.left && (
        <ArrowFatLeft size="100%" weight="fill"/>
      )}
      {!props.left && (
        <ArrowFatRight size="100%" weight="fill"/>
      )}
    </button>
  );
}

