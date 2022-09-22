import { useState, useEffect } from 'react';
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import './styles/main.css';
import logoImg from "./assets/logo-nlw-esports.svg"
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CheckCircle, GameController, MagnifyingGlassPlus, X } from 'phosphor-react';
import { Input } from './components/Form/input';
import { CreateAdModal } from './components/CreateAdModal';

import { GamesCarousel } from './components/GamesCarousel';
import { ConnectModal } from './components/ConnectModal';

export interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export interface Ad{
  id: string,
	gameId: string,
	name: string,
	yearsPlaying: number,
	discord: string,
	weekDays: "0,5,6",
	hourStart: string,
	hourEnd: string,
	useVoiceChanel: boolean,
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [ads, setAds] = useState<Ad[]>([])
  const [selectedAd, setSelectedAd] = useState<string>("")

  useEffect(() => {
    axios('http://localhost:8000/games').then(res => {
      setGames(res.data);
    })
    axios('http://localhost:8000/games/ads').then(res => {
      setAds(res.data);
    })
  }, [])

  function findGameByGameId(gameId: string) {
    const game = games.filter((game) => game.id === gameId);
    console.log(game)
    return game;
  }
  

  return (
    <div className="mx-auto flex flex-col items-center my-20 px-8 lg:px-20">
      <div className='flex flex-col items-center md:flex-row md:items-end gap-8 w-full'>
        <img src={logoImg} alt="logo" />
        <h1 className='text-4xl text-white font-black text-center md:text-start'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>
      </div>

      <section className='flex flex-col w-full mt-20 gap-8'>
        <h2 className='font-semibold text-3xl text-white'>Jogos mais populares</h2>
        <GamesCarousel items={games}/>
      </section>

      {/* desacoplar essa parte em um componente próprio */}
      <Dialog.Root>
      <div className='w-full mt-20 flex flex-col gap-6'>
        <h2 className='font-semibold text-3xl text-white'>Últimos Anúncios</h2>
        <div className='w-full grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8'>
        {ads.map(ad => {
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
                
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-all text-white rounded flex items-center gap-3 md:mt-0' onClick={() => setSelectedAd(ad.discord)}>
                  <GameController size={24}/>
                  Conectar
                </Dialog.Trigger>
              </div>
            </div>
          )
        })}
        </div>
      </div>

        <ConnectModal discordId={selectedAd} />
      </Dialog.Root>

      <Dialog.Root >
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App
