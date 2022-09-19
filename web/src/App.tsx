import { useState, useEffect } from 'react';
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";

import './styles/main.css';
import logoImg from "./assets/logo-nlw-esports.svg"
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/input';
import { CreateAdModal } from './components/CreateAdModal';

import { GamesCarousel } from './components/GamesCarousel';

interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:8000/games').then(res => {
      setGames(res.data);
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo" />
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>

      <GamesCarousel items={games}/>

      <Dialog.Root >
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
