import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Blog from "./components/Blog";
import CategoryPage from "./components/CategoryPage";
import CategoryBlogs from "./components/CategoryBlogs";
import SearchResults from './components/SearchResults';
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Products from './components/Products'

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/blogs/:slug" element={<Blog />} />
        <Route path="/blogs/" element={<Mainpage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:category" element={<CategoryBlogs />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact-us" element={<ContactUs/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
