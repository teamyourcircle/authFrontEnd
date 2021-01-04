import React from 'react';
import MediaCard from './MediaCard';
import './Product.css';
function Products(props) {
    return (
        <div className="show">
        <div class="show_products">
        <MediaCard 
        img="https://i.ibb.co/1RGWZt4/Black-White-and-Triangle-Data-Chase-Games-Logo-1.png"
        name="Survey Forms"
        description="Form survey service - form survey service will help you in creating a 
        quick form with Rich field types and help you to create quality Decision with simple visualizing tool."
        
        />
        </div>
        <div className="show_blog">

</div>
        </div>
    );
}

export default Products;