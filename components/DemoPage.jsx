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
    Title,
    Center
  } from '@mantine/core';


  
  
function DemoPage() {
  
  
    return (
      <>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        >     
       <Title ta="center" mb={10} order={1}>Demo Player</Title>
        <Card shadow="sm" padding="lg" radius="md" withBorder bg="#ededed" maw={524}> 
       
            <div style={{ width: '100%', height: '280px', padding: '0', overflow: 'hidden'}}>
            <iframe scrolling="no"  border="0" cellSpacing="0" src="https://sign-forge-player.vercel.app" style={{ border:'20px solid black', borderRadius:'10px', width: '1920px', height: '1060px',transform: 'scale(0.25)', transformOrigin: '0 0', overflow: 'hidden'}}></iframe>
            </div>
      
      </Card>
      </Flex>
      </>
    );
  }

  export{DemoPage}