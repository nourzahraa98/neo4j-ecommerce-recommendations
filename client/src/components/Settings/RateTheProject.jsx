import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Rating,
  Anchor,Textarea,
  Select,
  Stack,
  Container,
  useMantineColorScheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ReactFlagsSelect from "react-flags-select";
import { IconX } from "@tabler/icons";
import { API_BASE_URL } from "../../constants";

const RateProject = () => {
  let { search } = useLocation();
  const {currentUser} = useContext(AuthContext);
  const query = new URLSearchParams(search);
  const navigate = useNavigate();
  const order = query.get("order");
  const product = query.get("product");
  const [rating, setRating] = useState(0);
  const [feedback,setFeedback] = useState(null);

const rateProduct = async () => {
  axios
  .post(`${API_BASE_URL}/orders/rating`, {
    order:  order, product: product, feedback: feedback , user : currentUser.id,rating : rating
   })

  .then((res) => {
    console.log(res.data)
    navigate('/settings/order-history')
  })
  .catch((err) => {
    console.log("err");
    console.log(err);
  });
}


  return (
    <Container size={800} mt={70} mb={100}>
      <Paper radius="md" p={"md"} withBorder>
        <Text size={"lg"} transform="uppercase" weight={500} mb={"sm"}>
          Rate this product
        </Text>

        <Rating value={rating} onChange={setRating} />
        <Divider my="lg" />
        <Stack>
        <Textarea label="REVIEW THIS PRODUCT" size={"lg"} minRows={4}  maxRows={7} variant="filled"  onChange={(e) => {setFeedback(e.target.value)}}/>
        </Stack>
        <Group position="right" mt={'xl'} mb={"sm"}>
        <Button onClick={() => rateProduct()}>Submit</Button>

        </Group>
      </Paper>
    </Container>
  );
};

export default RateProject;
