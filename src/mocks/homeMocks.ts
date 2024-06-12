import { secondSectionImgSchema } from "../types/homeSchemas";
import { RoomDetailsSchema } from "../types/sliderSchemas";

export const secondSectionImgs : secondSectionImgSchema[] = [
  { src: "https://project3-images-storage.s3.us-east-2.amazonaws.com/static/dining.png", title: "Dining" },
  { src: "https://project3-images-storage.s3.us-east-2.amazonaws.com/static/living.png", title: "Living" },
  { src: "https://project3-images-storage.s3.us-east-2.amazonaws.com/static/bedroom.png", title: "Bedroom" },
]

export const fourthSectionItems: RoomDetailsSchema[] = [
  {
    id: '01',
    img: 'https://project3-images-storage.s3.us-east-2.amazonaws.com/static/room2.png',
    title: 'Inner Peace',
    type: 'Bed Room'
  },
  {
    id: '02',
    img: 'https://project3-images-storage.s3.us-east-2.amazonaws.com/static/room3.png',
    title: 'Inner Peace',
    type: 'Kitchen'
  },
  {
    id: '03',
    img: 'https://project3-images-storage.s3.us-east-2.amazonaws.com/static/room1.png',
    title: 'Inner Peace',
    type: 'Bed Room'
  }
]
