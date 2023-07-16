import {
  Box,
  Title,
  createStyles,
  Grid,
  Group,
  Button,
  Text,
  Tooltip,
  ActionIcon,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => {
  return {
    viewElement: {
      width: "70%",
      
      [theme.fn.smallerThan("md")]: {
        width: "85%",
      },
    },
  };
});

export default function ManageShippingAddress() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [address, setAddress] = useState([]);

  const fetchUserShippingAddress = useCallback(async () => {
    try {
      const result = await axios.get(
        `${API_BASE_URL}/users/shipping-address/${currentUser.id}`
      );

      setAddress(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchUserShippingAddress();
  }, [fetchUserShippingAddress]);

  const deleteShippingAddress = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/shipping-address/${id}`
      );

    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <Box className={classes.viewElement}>
      <Group position="apart" className={classes.header} mb={24}>
        <Title size="h3" transform="uppercase">
          Manage Shipping Address
        </Title>
        <Button
          onClick={() => {
            navigate("/settings/add-shipping-info");
          }}
        >
          Add New Address
        </Button>
      </Group>
      <Grid
        mb={"md"}
        
      >
        {address.map((i, index) => (
          <Grid.Col key={index} p={"sm"}>
            <Box  sx={(theme) => ({
          borderRadius: theme.radius.md,
         
            backgroundColor:
              theme.colorScheme === "dark"
                ? "#25262B"
                : "#e4e4e4"
        
        })}  py={"md"}>
              <Group px={"md"} position="apart">
                <Text weight={"bold"}>{i.name}</Text>
                <Tooltip label="Delete">
                  <ActionIcon
                    variant="outline"
                    onClick={async () => {
                      await deleteShippingAddress(i.id);
                      await fetchUserShippingAddress()
                    }}
                  >
                    <IconTrash size={18} />{" "}
                  </ActionIcon>
                </Tooltip>
              </Group>
              <Text weight={"bold"} px={"md"} size={14}>
                {i.address}
              </Text>
              <Group px={"md"}>
                <Text weight={"bold"} size={14}>
                  {i.city}
                  {","}
                </Text>
                <Text weight={"bold"} size={14}>
                  {i.country}
                </Text>
              </Group>
              <Text weight={"bold"} size={14} px={"md"}>
                {i.zipcode}
              </Text>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
