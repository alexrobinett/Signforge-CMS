import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/api';
import { Col, Grid, Text, Loader, Group} from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { AssetCard } from './AssetCard';
import { useLoaderData } from 'react-router-dom';
import { fetchImages } from '../../api/api';


export function assetLoader(){
  return fetchImages()
}

function ImageGallery() {
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');



  const images = useLoaderData()




  

  return (
    <Grid gutter="lg" justify="start" style={{ margin: '0.5rem' }}>
      {images.map((image) => {
        let colSpan;
        if (isMobile) {
          colSpan = 12;
        } else if (isTablet) {
          colSpan = 6;
        } else {
          colSpan = 4;
        }
  
        return (
          <Col key={image._id} span={colSpan}>
            <AssetCard
              imageURL={image.imageURL}
              id={image._id}
              fileName={image.fileName}
            />
          </Col>
        );
      })}
    </Grid>
  );
}



export { ImageGallery };