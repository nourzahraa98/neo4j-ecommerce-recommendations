import {
  ActionIcon,
  Avatar,
  Box,
  createStyles,
  Divider,
  Group,
  Title,
  InputBase,
  Stack,
  Text,
  TextInput,
  Tooltip,
  Loader,
  useMantineColorScheme,
} from "@mantine/core";
import { IconCheck, IconEdit } from "@tabler/icons";
import InputMask from "react-input-mask";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import ReactFlagsSelect from "react-flags-select";

const useStyles = createStyles((theme) => {
  return {
    viewElement: {
      width: "70%",
      [theme.fn.smallerThan("md")]: {
        width: "85%",
      },
      padding: "24px",
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
    },
    icon: {
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
      },
    },

    profileSettings: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      padding: "24px",
      borderRadius: theme.radius.md,
    },

    label: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      fontSize: theme.fontSizes.xs,
      fontWeight: 400,
    },
    data: {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
    },
  };
});

export default function ProfileInfoSettings() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayNameEdit, setDisplayNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);

  const { colorScheme } = useMantineColorScheme();

  const [region, setRegion] = useState("");
  

  const { classes } = useStyles();

  const fetchUser = useCallback(async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/users/${currentUser.id}`);

      setUser(result.data);
      setDisplayName(result.data.name);
      setEmail(result.data.email);
      setPhone(result.data.phone);
      setRegion(result.data.region);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUser = async (data) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${currentUser.id}`,
        data
      );

      setUser(response.data); // Handle the response data
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  const onCountrySelect = (code) => {
    setRegion(code)
    updateUser({region : code})
}


  return (
    <Box className={classes.viewElement}>
      {user ? (
        <>
          <Group position="apart" className={classes.header}>
            <Group>
              <Title size="h3" transform="uppercase">
                My account{" "}
              </Title>
            </Group>
          </Group>
          <Group position="left" className={classes.header}>
            <Avatar
              color={"primay"}
              size="xl"
              radius="100%"
              sx={(theme) => ({
                border: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[2]
                }`,
              })}
            >
              {user.name[0]}
            </Avatar>

            <Stack>
              <Text weight={900} transform="uppercase" size="xl">
                {user.name}
              </Text>
            </Stack>
          </Group>
          <Box className={classes.profileSettings}>
            <Box mb="sm" mt="sm">
              <Text className={classes.label} size="xs">
                Display Name
              </Text>
              <Group position="apart">
                {displayNameEdit ? (
                  <TextInput
                    value={displayName}
                    placeholder="displayName"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                ) : (
                  <Text className={classes.data} color={"white"}>
                    {displayName}
                  </Text>
                )}
                <Tooltip label="Edit">
                  <ActionIcon
                    radius={"xl"}
                    onClick={() => {
                      setDisplayNameEdit(!displayNameEdit);
                      displayNameEdit
                        ? updateUser({ name: displayName })
                        : console.log("a");
                    }}
                  >
                    {displayNameEdit ? (
                      <IconCheck size={24} />
                    ) : (
                      <IconEdit size={24} />
                    )}
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
            <Divider />
            <Box mb="sm" mt="sm">
              <Text className={classes.label} size="xs">
                Email
              </Text>
              <Group position="apart">
                <Text className={classes.data} color={"white"}>
                  {email}
                </Text>
                <Tooltip label="Edit">
                  <ActionIcon
                    disabled
                    radius={"xl"}
                    onClick={() => setEmailEdit(!emailEdit)}
                  >
                    <IconEdit size={24} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
            <Divider />
            <Box mb="sm" mt="sm">
              <Text className={classes.label} size="xs">
                Phone
              </Text>
              <Group position="apart">
                {phoneEdit ? (
                  <InputBase
                    placeholder="Your phone"
                    component={InputMask}
                    mask="9999 99 99 99"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <Text className={classes.data} color={"white"}>
                    {phone}
                  </Text>
                )}
                <Tooltip label="Edit">
                  <ActionIcon
                    radius={"xl"}
                    onClick={() => {
                      setPhoneEdit(!phoneEdit);
                      phoneEdit
                        ? updateUser({ phone: phone })
                        : console.log("a");
                    }}
                  >
                    {phoneEdit ? (
                      <IconCheck size={24} />
                    ) : (
                      <IconEdit size={24} />
                    )}
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
            <Divider />
            <Box mb="sm" mt="sm">
              <Text size={"sm"} my={10}>
                Country
              </Text>
            
               
                  <ReactFlagsSelect
                    selected={region}
                    onSelect={onCountrySelect}
                    showSelectedLabel={true}
                    showSecondarySelectedLabel={true}
                    selectedSize={16}
                    showOptionLabel={true}
                    showSecondaryOptionLabel={true}
                    optionsSize={16}
                    placeholder={""}
                    searchable={false}
                    searchPlaceholder={""}
                    alignOptionsToRight={false}
                    fullWidth={true}
                    disabled={false}
                    className={colorScheme == "dark" ? "country-select" : ""}
                  />
                
                
            </Box>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Loader color="violet" variant="bars" />
          </div>
        </>
      )}
    </Box>
  );
}
