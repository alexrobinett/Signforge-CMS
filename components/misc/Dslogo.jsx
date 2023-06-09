import {createStyles, getStylesRef,  Flex} from '@mantine/core';
import {
    IconDeviceTv,
  } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    Logo: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[2]
    },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[2],
    marginRight: theme.spacing.sm,
  },

  
  }));



function DsLogo() {
    const { classes } = useStyles();
  return (
        <Flex 
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap">
             <span className={classes.Logo}>SignForge</span>
            <IconDeviceTv className={classes.linkIcon}  stroke={2} size={30}/>
        </Flex>
        
  
    
  );
}


export {DsLogo}