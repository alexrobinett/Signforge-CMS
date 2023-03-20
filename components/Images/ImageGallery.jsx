import React, { useState, useEffect } from 'react';
import { Col, Grid, Text, Loader, Group} from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { AssetCard } from './AssetCard';
import { useGetImagesQuery } from '../../app/features/images/imagesAPI';


function ImageGallery() {
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 569px) and (max-width: 924px)');



  const {
    data: images,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetImagesQuery()


if (isLoading){
  return <Loader size="xl" variant="bars" />;
}

if (isError){
  return <Text>{error?.data?.message}</Text>
}
  
if (isSuccess){


  return (
    <Grid gutter="sm" justify="start" style={{ margin: '0.5rem' }}>
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

}



export { ImageGallery };