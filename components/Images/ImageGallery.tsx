import React from 'react';
import { Col, Grid, Text, Loader, Group, Container, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AssetCard } from './AssetCard';
import { useImages } from '../../app/features/images/imagesApi';

function ImageGallery() {
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 569px) and (max-width: 924px)');

  const {
    data: images,
    isLoading,
    isError,
    error,
    refetch,
  } = useImages();

  if (isLoading) {
    return (
      <Container mt={30}>
        <Group position="center">
          <Loader size="xl" variant="bars" />
        </Group>
      </Container>
    );
  }

  if (isError) {
    return <Text>{error?.message || 'Error loading images.'}</Text>;
  }

  if (!images || images.length === 0) {
    return <Text>No images found.</Text>;
  }

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
          <Col key={image.id} span={colSpan}>
            <AssetCard
              imageURL={image.imageURL}
              id={image.id}
              fileName={image.fileName}
              refetchImages={refetch}
            />
          </Col>
        );
      })}
    </Grid>
  );
}

export { ImageGallery };
