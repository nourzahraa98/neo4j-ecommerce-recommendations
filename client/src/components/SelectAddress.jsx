import {
    Button,
    Group,
    Radio,Anchor
  } from "@mantine/core";
  import { AuthContext } from "../context/AuthContext";
  import { useCallback, useContext, useState } from "react";
  import axios from "axios";
  import { useEffect } from "react";
  import { Link } from "react-router-dom";
  import { modals } from "@mantine/modals";
  import { API_BASE_URL } from "../constants";

const SelectAddress = () => {
    const { currentUser } = useContext(AuthContext);
    const [address, setAddress] = useState([]);
    const [shippingAddress, setShippingAddress] = useState(0);

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
  }, [fetchUserShippingAddress,]);
    return(
        <>
        <Group position="right" mb={24}>
        <Anchor component={Link} to={`/settings/add-shipping-info`} onClick={() => {
             
              modals.closeAll();
            }}>
            
          
            Add New Address
          </Anchor>
        </Group>
        <Radio.Group
          name="select-address"
          spacing="sm"
          value={shippingAddress}
          offset={"xl"}
          onChange={(event) => {
            setShippingAddress(event);
            console.log(event);
          }}
        >
          {address.map((i, index) => (
            <Radio
              my={"sm"}
              key={index}
              sx={(theme) => ({
                borderRadius: theme.radius.md,
                border: "1px solid #25262B",
              })}
              p={"md"}
              value={index} // Set the value of the radio button to the address ID
              label={i.name}
              description={
                i.address + " " + i.city + " " + i.country + "- " + i.zipcode
              }
            />
          ))}
        </Radio.Group>

        <Button
          fullWidth
          onClick={() => {
            console.log(shippingAddress);
          }}
          mt="md"
        >
          Submit
        </Button>
      </>
    )
}

export default SelectAddress