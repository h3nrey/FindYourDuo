import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { ArrowFatLeft, ArrowFatRight, ArrowLeft, ArrowRight } from 'phosphor-react';
import { useState } from 'react';
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
      perView: 6
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
          perView: 3,
          spacing: 16,
        },
      },
      "(min-width: 1000px)": {
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
    <div className='navigation-wrapper relative w-[100vw] px-[10%] md:px-[15%]  mt-16'>   
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
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <button
      onClick={props.onClick}
      className={`content-[''] absolute top-2/4 cursor-pointer md:w-16 md:h-16 sm:w-8 sm:h-8 -translate-x-1/2 -translate-y-2/4  z-10 text-white ${
        props.left ? "arrow--left left-[6%] md:left-[9%]" : "arrow--right left-auto md:right-[5%] right-[-2.5%]"
      } ${disabeld}`}
    >
      {props.left && (
        <ArrowFatLeft size="100%" weight="fill" className="text-white"/>
      )}
      {!props.left && (
        <ArrowFatRight size="100%" weight="fill" className="text-white"/>
      )}
    </button>
  );
}