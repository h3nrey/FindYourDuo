import express from 'express'
import cors from "cors";
import {PrismaClient} from "@prisma/client"
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app =  express();

app.use(express.json())
app.use(cors())
//Prisma
const prisma = new PrismaClient({
  log: ['query']
})


//Routes
app.get("/games", async(req,res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  res.send(games);
  // res.json(games)
})

app.post("/games/:id/ads", async(req,res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChanel: body.useVoiceChannel,
    }
  })
  
  res.status(201).json(ad);
})

app.get("/games/:id/ads", async(req,response) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChanel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  }));
})

app.get("/ads/:id/discord", async(req,response) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discord,
  });
})
app.listen(8000);