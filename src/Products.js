import React from 'react';
import MediaCard from './MediaCard'
import Button from '@material-ui/core/Button';

function Products(props) {
    return (
        <div class="products">
        <MediaCard 
        img="https://i.ibb.co/1RGWZt4/Black-White-and-Triangle-Data-Chase-Games-Logo-1.png"
        name="Survey Forms"
        description="Form survey service - form survey service will help you in creating a 
        quick form with Rich field types and help you to create quality Decision with simple visualizing tool."
        />
       <Button size="small" color="secondary" variant="contained" style={{width:'21%'}}>
          <a href="http://localhost:8080/dashboard/form" target="_blank"> Get Started</a>
        </Button>
        </div>
    );
}

export default Products;