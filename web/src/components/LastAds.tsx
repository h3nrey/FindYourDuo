import { GameController } from "phosphor-react";
import { Ad, Game } from "../App";

interface LastAdsProps{
  games: Game[],
  ads: Ad[]
}

export function LastAds(props : {props: LastAdsProps}) {
  function findGameByGameId(gameId: string) {
    const game = props.props.games.filter((game) => game.id === gameId);
    console.log(game)
    return game;
  }
  return(
    <div className='w-full mt-20 flex flex-col gap-6'>
        <h2 className='font-semibold text-3xl text-white'>Últimos Anúncios</h2>
        <div className='w-full grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8'>
        {props.props.ads.map(ad => {
          return(
            <div key={ad.id} className="flex group">
              <img src={findGameByGameId(ad.gameId)[0].bannerUrl} className="bg-contain flex-1" alt="" />
              <div className='bg-[#2A2634] px-8 transition-all group-hover:pr-16 py-4 flex flex-col gap-4'>
                <div className='flex flex-col'>
                  <span className='text-zinc-500 text-sm'>Nome</span>
                  <strong className='text-white font-bold'>{ad.name}</strong>
                </div>
                <div className='flex flex-col'>
                  <span className='text-zinc-500 text-sm'>Tempo de jogo</span>
                  <strong className='text-white font-bold'>{ad.yearsPlaying} ano(s)</strong>
                </div>
                <div className='flex flex-col'>
                  <span className='text-zinc-500 text-sm'>Disponibilidade</span>
                  <strong className='text-white font-bold'>{ad.weekDays.length} 🔘 {ad.hourStart} - {ad.hourEnd}</strong>
                </div>
                <div className='flex flex-col'>
                  <span className='text-zinc-500 text-sm'>Chamada de Áudio?</span>
                  <strong className={ad.useVoiceChanel ? 'text-emerald-500' : 'text-red-500'} >{ad.useVoiceChanel ? 'Sim' : 'Não'}</strong>
                </div>
                <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-all text-white rounded flex items-center gap-3 md:mt-0'>
                  <GameController size={24}/>
                  Conectar
                </button>
              </div>
            </div>
          )
        })}
        </div>
      </div>
  )
}