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
    marginTop: theme.spacing.xl,
    fontSize: rem(16),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
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
        Players Tab:
The players tab is where you can create and manage player names. This is useful if you have multiple screens and want to assign each one a specific name. To create a player, click on the "Create Player" button and enter a name. You can then assign messages and playlists to each player.
        </Text>

        <Text className={classes.description} color="dimmed">Messages Tab:
The messages tab is where you can manage your player playlists and create or update messages. To create a message, click on the "Create Message" button and select the player you want to assign it to. You can then add text, images to your message. To Edit a playlist simply select a player from the dropdown menu and you can see it's current messages
        </Text>

        <Text className={classes.description} color="dimmed">Messages Tab:
        Assets Tab:
The assets tab is where you can upload your images to be used in your digital signage messages. To upload an image, click on the "Upload" button and select the image you want to upload. You can then use this image in your messages.
        </Text>

        <Text className={classes.description} color="dimmed">
       Demo Tab:
The demo tab allows you to see a demo player. This is useful if you want to see how your messages will look on your digital signage screens before you actually display them.
        </Text>

      </Container>
      </Card>
  );
}

export {Welcome}