import Image from "next/image";
import Banner from "../Component/Banner";
import FavouriteSlider from "../Component/favouriteslider";
import Listing from "../Component/Listing";
import Playstore from "../Component/Playstore";
export default function Home() {
  return (
    <>
      <Banner />
      <section id="favourite" className="container mx-auto py-4">
        <h3 className="text-2xl font-semibold text-blue-950">Discover your new favourite stay</h3>
        <div className="mt-2">
          <FavouriteSlider />
        </div>
        
        <div className="mt-5">
        <h3 className="text-2xl font-semibold text-blue-950 py-4">Discover your new favourite stay</h3>
          <Listing />
        </div>

        <div className="mt-5">
       
          <Playstore />
        </div>
        
      </section>


    </>

  );
}
