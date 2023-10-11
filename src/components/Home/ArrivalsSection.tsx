import { FC, useEffect, useState } from "react"
import Slider from "react-slick"
import axios from "axios"

const ArrivalsSection: FC = (): JSX.Element => {
  const [category, setCategory] = useState<any>([])
  useEffect(() => {
    retrieveCategory().then((response) => {
      setCategory(response.data.result)
    }).catch((error) => {
      console.error(error)
    })
  }, [])
  async function retrieveCategory() {
    return axios.get("http://localhost:5000/api/categories")
  }
  const settings = () => {
    return {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  }
  //TODO:Getting categories from the database 
  return (
    <>
      <section className="h-full w-[90%] mx-auto py-36" id="arrival">
        <h2 className="text-center text-4xl">Categories</h2>
        <p className="w-[70%] mx-auto text-center py-5">These are some of the categories we have for the Products</p>
        <div className="mx-auto">
          <Slider {...settings()} >
            {category.length > 0 && category.map((obj: any) => (
              <span key={obj.id} className="hover:bg-gray-200 transition-colors text-center py-1 rounded-full">{obj.name}</span>
            ))}
          </Slider>
        </div>
      </section>
    </>
  )
}


export default ArrivalsSection
