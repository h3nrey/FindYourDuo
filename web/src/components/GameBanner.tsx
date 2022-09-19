interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}


export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden w-full h-full'>
      <img src={props.bannerUrl} className="w-full h-full" alt="" />
      
      <div className='w-full pt-16 md:pb-4 md:px-4 px-2 pb-2 bg-game-gradient absolute right-0 left-0 bottom-0'>
        <strong className='font-bold text-white hidden md:block'>{props.title}</strong>
        <span className='text-zinc-300 text-sm block'>{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}