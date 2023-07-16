import { createStyles, Group, Container, Center } from '@mantine/core';
import { SettingsNav } from '../components/_index';
import { Outlet } from 'react-router-dom'
import {useEffect,useCallback, useState,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";



const useStyles = createStyles((theme, _params, getRef) => {
    return {
        container: {
            height: "100vh",
            width: "75%",
            [theme.fn.smallerThan("md")]: {
                width: "100%",
            },
        },
    };
});



export default function SettingsPage() {

    const { classes } = useStyles();
    const [user,setUser] = useState(null)
    const { currentUser } = useContext(AuthContext);

    const fetchUser = useCallback(async () => {
        try {
          const result = await axios.get(`http://localhost:4000/users/${currentUser.id}`);
          console.log(result);
          setUser(result.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }, [currentUser.id]);
    
      useEffect(() => {
        
        fetchUser();
      }, [fetchUser]);

      console.log(user)

    return (
        <Group spacing={0} position='left' m={0} p={0}>
            <SettingsNav user={user ? user : currentUser} />
            <Container size={"xl"} className={classes.container} m={0} py={"xl"} px={0}>
                <Center>
                    <Outlet />
                </Center>
            </Container>
        </Group >
    );
}