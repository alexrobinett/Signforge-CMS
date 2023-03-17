import React, { useState, useEffect } from 'react';
import { apiClient } from '../../api/api';
import { Col, Grid, Text, } from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { AssetCard } from './AssetCard';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');


  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/images/?id=640bf6e47781518ed5c23575`);
      setImages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  }



  async function deleteImage(id) {
    try {
      await apiClient.delete(`/images/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
  const [editing, setEditing] = useState(false);
  
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

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