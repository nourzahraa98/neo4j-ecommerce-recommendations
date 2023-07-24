import { useState } from 'react';
import { createStyles, Navbar, Group, Anchor, Avatar, Text } from '@mantine/core';
import { IconSettings, IconLogout, IconChartDots, IconBox, IconUsers, IconMessages, IconArchive, IconListCheck } from '@tabler/icons';
import { Link } from 'react-router-dom';
import logosvg from "../../assets/images/logo.png"

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = "icon";
   
    return {
      navbar: {
        backgroundColor: '#25262B',
      
        overflow: "auto",
        width: "25%",
        [theme.fn.smallerThan("md")]: {
          width: "100%",
        },
      },
  
      header: {
        paddingBottom: theme.spacing.md,
        marginBottom: theme.spacing.md * 1.5,
        borderBottom: `1px solid #696969 `
      },
  
      username: {
        color: theme.colors.gray[0],
        [theme.fn.smallerThan("lg")]: {
          display: "none",
        },
        [theme.fn.smallerThan("md")]: {
          display: "block",
        },
      },
  
      profileGroup: {
        borderRadius: theme.radius.sm,
        "&:hover": {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor })
              .background,
            0.1
          ),
        },
      },
  
      footer: {
        paddingTop: theme.spacing.md,
        marginTop: theme.spacing.md,
        borderTop: `1px solid #696969 `,
      },
  
      link: {
        ...theme.fn.focusStyles(),
        padding: '16px',
        marginTop: '10px',
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.white,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
  
        "&:hover": {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor })
              .background,
            0.15
          ),
          [`& .${icon}`]: { opacity: 0.9 },
        },
      },
  
      linkIcon: {
        ref: icon,
        
        color: theme.white,
        opacity: 0.75,
        marginRight: theme.spacing.sm,
      },
  
      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.fn.lighten(
            theme.fn.variant({ variant: "filled", color: theme.primaryColor })
              .background,
            0.15
          ),
          [`& .${icon}`]: { opacity: 0.9 }
        },
      },
    };
  });
const data = [
    { link: '', label: 'Manage Orders', icon: IconListCheck },
    { link: 'manage-products', label: 'Manage Products', icon: IconBox },
   
];

/*
    supervision, gestion, contact support archive rapport
*/

export default function AdminNav() {

    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Profile Overview');

    const links = data.map((item) => (
        <Link
            className={cx(classes.link, { [classes.linkActive]: item.label === active })}
            to={item.link}
            key={item.label}
            onClick={() => setActive(item.label)}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar m={0} height={"100vh"} width={"100%"} p="md" className={classes.navbar}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    <Anchor component={Link} to="/" size={28} sx={theme => ({
                        color: theme.colors.gray[2],
                        cursor: 'pointer',
                    })}>
                        <img width={"150px"} height={"130px"} src={logosvg} alt="logo" />
                    </Anchor>
                    
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
              

               
            </Navbar.Section>
        </Navbar>
    );
}