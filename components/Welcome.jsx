import { createStyles, Container, Text, Button, Group, rem, Card } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(5),
    paddingBottom: rem(10),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.lg,
    fontSize: rem(16),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

function Welcome() {
  const { classes } = useStyles();

  return (
    <Card mt={20} shadow="xs" mx="md" p="xs"> 
      <Container className={classes.inner} mt={0}>
        <h1 className={classes.title}>
          Welcome to{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
          Signforge!
          </Text>{' '}
        </h1>

        <Text className={classes.description} color="dimmed">
        a digital signage platform that allows you to manage and display content on your digital signage screens. This guide will provide you with a quick primer on how to use the platform.
        </Text>

        <Text className={classes.description} color="dimmed">
       <Text fw={700} c="black">Players Tab:</Text> 
The players tab is where you can create and manage virtual players. Virtual Players allow you to run the your ads/messages on any chromium based browser. ideally on a Raspberry pi 4 or other SBCs. Virtual players allow you to have multiple screens. To use each player visit https://sign-forge-player.vercel.app and paste in the player id when prompted. To create a player, click on the "Create Player" button and enter a name. You can then assign messages to each player and reorder them on the messages tab.
        </Text>

        <Text className={classes.description} color="dimmed"><Text fw={700} c="black">Messages / Ads Tab:</Text> 
The messages tab is where you can manage your player's playlist order and create or update messages. To create a message, click on the "Create ad/message" button and select the player you want to assign it to. You can then add text, images to your ads/messages. To Edit the playlist order simply select a player from the dropdown menu and you can see it's current messages and reorder them by dragging and dropping them. 
        </Text>

        <Text className={classes.description} color="dimmed">
        <Text fw={700} c="black">Assets Tab:</Text> 
The assets tab is where you can upload your images to be used in your digital signage ads/messages. To upload an image, click on the "Upload" button and select the image you want to upload. You can then use this image in your ads/messages.
        </Text>

        <Text className={classes.description} color="dimmed">
        <Text fw={700} c="black">Demo Tab:</Text> 
The demo tab allows you to see a demo player. This is useful if you want to see how your messages/ads will look on your digital signage screen. To use the demo player simply copy a player's ID from the player tab and past it into the alert.
        </Text>

      </Container>
      </Card>
  );
}

export {Welcome}