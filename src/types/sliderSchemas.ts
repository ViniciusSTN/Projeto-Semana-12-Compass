export type SliderSchema = {
  rooms: RoomDetailsSchema[]
}

export type RoomDetailsSchema = {
  id: string
  img: string
  title: string
  type: string
}

export type RoomInspirationCardSchema = {
  roomDetails : RoomDetailsSchema
}
