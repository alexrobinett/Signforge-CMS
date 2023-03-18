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
  import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin,
  } from '@tabler/icons-react';

  
  const mockdata = [
    { title: 'Credit cards', icon: IconCreditCard, color: 'violet' },
    { title: 'Banks nearby', icon: IconBuildingBank, color: 'indigo' },
    { title: 'Transfers', icon: IconRepeat, color: 'blue' },
    { title: 'Refunds', icon: IconReceiptRefund, color: 'green' },
    { title: 'Receipts', icon: IconReceipt, color: 'teal' },
    { title: 'Taxes', icon: IconReceiptTax, color: 'cyan' },
    { title: 'Reports', icon: IconReport, color: 'pink' },
    { title: 'Payments', icon: IconCoin, color: 'red' },
    { title: 'Cashback', icon: IconCashBanknote, color: 'orange' },
  ];
  
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 700,
    },
  
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: theme.radius.md,
      height: rem(90),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
  
      '&:hover': {
        boxShadow: theme.shadows.md,
        transform: 'scale(1.05)',
      },
    },
  }));
  
function CardBadgeEX() {
    const { classes, theme } = useStyles();
  
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    ));
  
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

  export{CardBadgeEX}