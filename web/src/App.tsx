import { useState, useEffect } from 'react';
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import './styles/main.css';
import logoImg from "./assets/logo-nlw-esports.svg"
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController, MagnifyingGlassPlus } from 'phosphor-react';
import { Input } from './components/Form/input';
import { CreateAdModal } from './components/CreateAdModal';

import { GamesCarousel } from './components/GamesCarousel';
import { LastAds } from './components/LastAds';

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

  useEffect(() => {
    axios('http://localhost:8000/games').then(res => {
      setGames(res.data);
    })
    axios('http://localhost:8000/games/ads').then(res => {
      setAds(res.data);
    })
  }, [])

  

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

      <LastAds props={{games,ads}}/>
      <Dialog.Root >
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
      
    </div>
  )
}

export default App
