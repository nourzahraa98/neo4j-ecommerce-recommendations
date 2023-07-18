import { useState,useContext} from "react";
import {
  createStyles,
  Navbar,
  Group,
  Anchor,
  Avatar,
  Text,
} from "@mantine/core";
import {
  IconKey,
  IconSettings,
  IconLogout,
  IconUser,
  IconHistory,
  IconTruckDelivery,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import logosvg from "../../assets/images/digital_easy_logo.svg";

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
  { link: "", label: "Change Profile Info", icon: IconUser },
  { link: "change-password", label: "Change Password", icon: IconKey },
  {
    link: "manage-shipping-info",
    label: "Manage Shipping Info",
    icon: IconTruckDelivery,
  },
  { link: "order-history", label: "Order History", icon: IconHistory },
];

export default function SettingsNav({user}) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Profile Overview");
 

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar
      m={0}
      height={"100vh"}
      width={"100%"}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Anchor
            component={Link}
            to="/"
            size={28}
            sx={(theme) => ({
              color: theme.colors.gray[2],
              cursor: "pointer",
            })}
          >
            <img width={"100px"} height={"100px"} src={logosvg} alt="logo" />
          </Anchor>
          <Group p={10} className={classes.profileGroup} position="right">
            <Avatar
              m={0}
              p={0}
              alt={"user_name"}
              radius="xl"
              size={35}
              
              className={classes.avatar}
            >
              {user.name[0]}
            </Avatar>
            <Text className={classes.username} m={0} p={0} weight={900}>
              {user.name}
            </Text>
          </Group>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
      

        <a
          href="/"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
