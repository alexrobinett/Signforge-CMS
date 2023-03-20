import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    rem,
    Flex,
    Title
  } from '@mantine/core';


  
  
function DemoPage() {
  
  
    return (
      <>
      <Title ta="center" order={1}>Demo Player</Title>
      <Flex
      mih={50}
      gap="md"
      justify="center"
      align="flex-start"
      direction="row"
      >     
        <div style={{ width: '500px', height: '300px', padding: '0', overflow: 'hidden'}}>
        <iframe scrolling="no" src="https://alexrobinett.github.io/C-Store-Digital-Ad-Spot/" style={{border:'20px solid black', width: '1920px', height: '1060px',transform: 'scale(0.25)', transformOrigin: '0 0', overflow: 'hidden'}}></iframe>
        </div>
      </Flex>
      
      
      </>
    );
  }

  export{DemoPage}