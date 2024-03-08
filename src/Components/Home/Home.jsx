import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx';
import { Helmet } from 'react-helmet';


export default function Home() {

  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>freshcart</title>
    </Helmet>
    <MainSlider />
    <CategoriesSlider />
    <FeaturedProducts />

  </>
}
