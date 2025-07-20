import React from 'react';
import { Link } from 'react-router-dom';
import './Styles.css'; // Add your CSS for styling
import NavBar from './NavBar';
import Footer from './Footer';

const CategoryPage = () => {
  const categories = ['Tech', 'Fitness', 'Health', 'Lifestyle', 'Business','Household','Personal Finance', 'Mental Wellness','Productivity','Parenting & Family',
     'Education & Learning', 'Food & Recipes','Travel & Adventure', 'Home Improvement','Sustainability & Eco-Living', 'Career & Work-Life', 'Relationships',
    'Self-Care & Personal Growth', 'Beauty & Grooming', 'Entertainment & Media', 'Tech How-Tos','Motivation & Inspiration'];

  return (
  <>
    <div className="category-page">
      <NavBar />
      <h1>Browse by Categories</h1>
      <div className="categories">
        {categories.map((category) => (
          <div className="category-card" key={category}>
            <Link to={`/category/${category.toLowerCase()}`} className="category-link">
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2> {/* First letter lowercase */}
              <p>Explore the latest blog posts on {category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default CategoryPage;



