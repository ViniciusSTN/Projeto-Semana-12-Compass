import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { RoomDetailsSchema, SliderSchema } from "../../types/sliderSchemas";
import { RoomInspirationCard } from "../Home/RoomInspirationCard";

export default function Slider({rooms}: SliderSchema) {
  return (
    <Splide
      className=""
      tag="div"
      options={ {
        type: 'loop',
        rewind: true,
        width : '1000px',
        autoWidth: true,
        gap: 24,
        pagination: true,
        arrows: true,
        autoplay: true,
        interval: 4000,
        wheel: true,
      } }
    >
      {
        rooms.map((room: RoomDetailsSchema) => (
          <SplideSlide key={room.id}>
            <div className="my-11">
              <RoomInspirationCard roomDetails={room} />
            </div>
          </SplideSlide>
        ))
      }
    </Splide>
  )
}
