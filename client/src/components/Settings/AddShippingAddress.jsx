import {
  Box,
  Title,
  Button,
  createStyles,
  Grid,
  Group,
  Text,
  TextInput,
  useMantineColorScheme,
  Textarea,
} from "@mantine/core";
import { useState,useContext } from "react";
import ReactFlagsSelect from "react-flags-select";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => {
  return {
    viewElement: {
      width: "70%",

      [theme.fn.smallerThan("md")]: {
        width: "85%",
      },
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 15,
    },
    icon: {
      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
      },
    },

    shippingSettings: {
      padding: "20px",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
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

export default function AddShippingAddress() {
  const { colorScheme } = useMantineColorScheme();
  const [selected, setSelected] = useState("");
  const onSelect = (code) => setSelected(code);
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  

  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);

  const addShippingAddressHandler = async () => {
      axios
      .post(`${API_BASE_URL}/users/shipping-address`, {
        address:  shippingAddress, zipCode: zipCode, country: selected, city: city,name: name, userId : currentUser.id
       })

      .then((res) => {
        console.log(res.data)
        navigate('/settings/manage-shipping-info')
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  }

 
  return (
    <Box className={classes.viewElement}>
      
      <Group position="left" className={classes.header}>
        <Group>
          <Title size="h3" transform="uppercase">
            Add Shipping Information
          </Title>
        </Group>
      </Group>
      <Box className={classes.shippingSettings}>
        <Box mb="xl" mt="sm">
          <Box mb={"md"}>
            <Text className={classes.label} size="xs">
              {" "}
              Name
            </Text>
            <TextInput onChange={(e) => setName(e.target.value)} value={name} />
          </Box>
          <Box mb={"md"}>
            <Text className={classes.label} size="xs">
              Country
            </Text>
            <ReactFlagsSelect
              selected={selected}
              onSelect={onSelect}
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
          <Grid mb={"xs"}>
            <Grid.Col span={12} xs={6}>
              <Text className={classes.label} size="xs">
                {" "}
                City
              </Text>
              <TextInput
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </Grid.Col>
            <Grid.Col span={12} xs={6}>
              <Text className={classes.label} size="xs">
                Zip Code
              </Text>
              <TextInput
                onChange={(e) => setZipCode(e.target.value)}
                value={zipCode}
              />
            </Grid.Col>
          </Grid>
          <Box mb={"md"}>
            <Text className={classes.label} size="xs">
              Shipping Address
            </Text>
            <Textarea
              onChange={(e) => setShippingAddress(e.target.value)}
              value={shippingAddress}
            />
          </Box>

          <Group position="right" mt={"xl"}>
            <Button onClick={addShippingAddressHandler}>Save Address</Button>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}
