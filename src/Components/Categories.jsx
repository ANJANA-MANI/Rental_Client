import React from 'react'
import { categories } from '../data'
import { Link } from 'react-router-dom'
import '../styles/Category.scss'
import { Category } from '@mui/icons-material';
function Categories() {
 
  return (
   <div className="categories">
    <h1>
      Explore Top Categories
    </h1>
    <p>
    Whether you're embarking on a weekend getaway, planning an extended stay, or sharing your space with travelers from around the world, Rental Nest is your trusted companion for unforgettable rental experiences. Welcome home, wherever your journey takes you.
    </p>
    <div className="categories_list">

        {categories?.slice(1, 7).map((category, index) => (
    
          <Link to={`/properties/category/${category.label}`}>
               <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div> 
           
          </Link>
        ))}
      </div>
   </div>
  )
}

export default Categories