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
  import {useMediaQuery } from '@mantine/hooks'

  
  
function DemoPage() {
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 569px) and (max-width: 1080px)');
  

  if (isMobile){
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
        <Card shadow="sm" padding="sm" radius="md" withBorder bg="#ededed" maw={350}> 
       
            <div style={{ width: '100%', height: '186px', padding: '0', overflow: 'hidden'}}>
            <iframe scrolling="no"  border="0" cellSpacing="0" src="https://sign-forge-player.vercel.app" style={{ width: '2350px', height: '1310px',transform: 'scale(0.14)', transformOrigin: '0 0', overflow: 'hidden'}}></iframe>
            </div>
      
      </Card>
      </Flex>
      </>
    )
  } else if (isTablet){
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
            <iframe scrolling="no"  border="0" cellSpacing="0" src="https://sign-forge-player.vercel.app" style={{ width: '1920px', height: '1060px',transform: 'scale(0.25)', transformOrigin: '0 0', overflow: 'hidden'}}></iframe>
            </div>
      
      </Card>
      </Flex>
        </>
      )
  }else 

  return(

    <Flex
    mih={50}
    gap="md"
    justify="center"
    align="center"
    direction="column"
    >     
   <Title ta="center" mb={10} order={1}>Demo Player</Title>
    <Card shadow="sm" padding="lg" radius="md" withBorder bg="#ededed" maw={824}> 
   
        <div style={{ width: '100%', height: '445px', padding: '0', overflow: 'hidden'}}>
        <iframe scrolling="no"  border="0" cellSpacing="0" src="https://sign-forge-player.vercel.app" style={{ width: '1920px', height: '1080px',transform: 'scale(0.404)', transformOrigin: '0 0', overflow: 'hidden'}}></iframe>
        </div>
  
  </Card>
  </Flex>
  )

  
 

  }

  export{DemoPage}