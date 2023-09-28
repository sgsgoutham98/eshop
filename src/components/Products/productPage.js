import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ToggleButton from '@mui/lab/ToggleButton';
import ToggleButtonGroup from '@mui/lab/ToggleButtonGroup';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductDisplay = () => {
  
    const categories=["ALL","APPAREL","ELECTRONICS","PERSONAL CARE"]
    let sortOrder="default"
    let products=[
        {name:"test",price:"123"},
        {name:"test",price:"123"},
        {name:"test",price:"123"},
        {name:"test",price:"123"}
    ]

  useEffect(() => {
    axios.get('/products/categories')
      .then(response => {});
  }, []);

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        let sortedProducts = [...response.data];
        if (sortOrder === 'priceHighToLow') {
          sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortOrder === 'priceLowToHigh') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'newest') {
          sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
   // TO-DO
      });
  }, [sortOrder]);

  const handleSortOrder = (event, newSortOrder) => {

  };

  return (
    <div>
      {/* Category Tabs */}
      <ToggleButtonGroup
        value={sortOrder}
        exclusive
        onChange={handleSortOrder}
      >
        {categories.map(category => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      

      <div>
        {products.map(product => (
              <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
