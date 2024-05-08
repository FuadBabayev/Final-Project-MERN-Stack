import { Link } from "react-router-dom";
import BrandSwiper from "../BrandSwiper/BrandSwiper";
import "./css/HomePage.css";
import BagCollection from "/images/page3.webp";
import HatCollection from "/images/page3a.webp";
import HomeProductTrending from "../Trending/HomeProductTrending";
import HomeCategory from "../HomeCategory/HomeCategory";

function HomePage() {
  return (
    <main className="homepage">
      <div className="homepage_first_page">
        <div className="container">
          <div className="writing">
            <h1>Summer <br /> Men's Shirt</h1>
            <p>Discover The Collection as Styled By Fashion In Our New Season Campaign</p>
            <div className="link"><Link to="/products-filter">Shop Now</Link></div>
          </div>
        </div>
      </div>

      <HomeCategory />
        <div className="homepage_gap_section">
          <div className="container">
            <div className="pictures">
              <div className="picture_item"><img src={BagCollection} alt="Bag Collection" /></div>
              <div className="picture_item"><img src={HatCollection} alt="Hat Collection" /></div>
            </div>
          </div>
        </div>
      <HomeProductTrending />


      {/* <div className="homepage_third_page">
        <div className="container">
          <section>
            <div className="section_third_upper">
              <h2>LATEST FORM BLOG</h2>
              <p>The freshest and most exciting news</p>
            </div>
            <div className="section_third_lower">
              <div className="section_third-cart">
                <div className="third_cart_upper"><img src={SpringTrending} alt="SpringTrending" /></div>
                <div className="third_cart_lower">
                  <h2>Spring – Summer Trending</h2>
                  <h3>By <span>admin</span> on <span>May 11</span>, 2022</h3>
                  <p>Typography is the work of typesetters, compositors, typographers, graphic designers, art directors...</p>
                </div>
              </div>
              <div className="section_third-cart">
                <div className="third_cart_upper"><img src={EastWayTrending} alt="EastWayTrending" /></div>
                <div className="third_cart_lower">
                  <h2>Spring – Summer Trending</h2>
                  <h3>By <span>admin</span> on <span>May 11</span>, 2022</h3>
                  <p>Typography is the work of typesetters, compositors, typographers, graphic designers, art directors...</p>
                </div>
              </div>
              <div className="section_third-cart">
                <div className="third_cart_upper"><img src={WeddingSeason} alt="WeddingSeason" /></div>
                <div className="third_cart_lower">
                  <h2>Spring – Summer Trending</h2>
                  <h3>By <span>admin</span> on <span>May 11</span>, 2022</h3>
                  <p>Typography is the work of typesetters, compositors, typographers, graphic designers, art directors...</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div> */}



<div className="homepage_forth_page">
        <div className="container">
          <div className="writing">
            <h1>Trending <br /> Collection Fashion</h1>  
            <p>Fashion is a form of self-expression and autonomy at a particular period and place and in a specific context, of clothing, footwear, lifestyle, accessories, makeup, hairstyle, and body posture.</p>
            <div className="link"><Link to="/admin">Go To Categories</Link></div>
          </div>
        </div>
      </div>


      <BrandSwiper />
    </main>
  );
}

export default HomePage;
