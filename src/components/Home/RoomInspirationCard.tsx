import { RoomInspirationCardSchema } from "../../types/sliderSchemas"

export const RoomInspirationCard = ({roomDetails}: RoomInspirationCardSchema) => {
  return (
    <div className="w-404px h-582px relative flex justify-center items-center">
      <img src={roomDetails.img} alt={roomDetails.title} className="w-full h-full object-cover" />
      <div className="absolute bottom-6 left-6 py-8 px-5">
        <span className="bg-white opacity-70 absolute inset-0"></span>
        <div className="flex items-center max-w-36 relative z-10">
          <span className="mr-2 font-Poppins font-medium text-gray200">{roomDetails.id}</span>
          <div className="flex-grow border-t border-gray200 mr-2"></div>
          <span className="font-Poppins font-medium text-gray200">{roomDetails.type}</span>
        </div>
        <h4 className="font-Poppins font-semibold text-2.5xl text-darkgreen relative z-10">{roomDetails.title}</h4>
        <div className="w-12 h-12 bg-goldenbrown flex items-center justify-center absolute -right-12 bottom-0">
          <img src="https://project3-images-storage.s3.us-east-2.amazonaws.com/static/arrow.svg" alt="arrow" />
        </div>
      </div>
    </div>
  )
}
