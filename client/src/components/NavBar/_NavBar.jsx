import { useContext } from "react";
import {
  Container,
  Group,
  Burger,
  Drawer,
  Anchor,
  Button,
  ActionIcon
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconLogin,
  IconShoppingCart,
  IconSettings,
  IconLogout,
} from "@tabler/icons";
import SearchAutoComplete from "./SearchAutoComplete";
import useStyles from "./_style";
import DrawerContent from "./DrawerContent";
import ThemeSwitcher from "../ThemeSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logosvg from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const tabs = ["Section1", "Section2", "Section3", "Section4"];

  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { currentUser, dispatch } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width: 765px)");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  if (location.startsWith("/account")) {
    return null;
  }

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Anchor component={Link} to="/" className={classes.logo} size={28}>
              <img width={"120px"} height={"120px"} src={logosvg} alt="logo" />
            </Anchor>
          </Group>


          {!isMobile && (
            <Group>
              <Button
                onClick={() => navigate("/cart")}
                leftIcon={<IconShoppingCart />}
              >
                CART
              </Button>
              {currentUser ? (
                <>
                  <Button
                    onClick={() => {
                        navigate("/settings");
                    }}
                    variant="outline"
                    color="blue"
                    leftIcon={<IconSettings />}
                  >
                    SETTINGS
                  </Button>
                  <ActionIcon
                 padding="xl"
                 size="md"
                  color="purple"
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                    }}
                    variant="outline"
                  >
                    <IconLogout />
                  </ActionIcon>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/authentication");
                    }}
                    variant="outline"
                    color="blue"
                    rightIcon={<IconLogin />}
                  >
                    LOGIN
                  </Button>
                </>
              )}
               <ThemeSwitcher />
          <Drawer
            className={classes.drawer}
            opened={opened}
            onClose={toggle}
            padding="xl"
            size="md"
          >
            <DrawerContent toggledrawer={toggle} />
          </Drawer>
            </Group>
          )}

         
        </Group>
      </Container>
    </div>
  );
}
