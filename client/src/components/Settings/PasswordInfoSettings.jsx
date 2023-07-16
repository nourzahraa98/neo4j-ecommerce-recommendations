import {
  Title,
  Text,
  Box,
  Button,
  createStyles,
  Group,
  PasswordInput,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useState,useCallback,useContext,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

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

    passwordSettings: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[2],
      padding: `24px`,
      borderRadius: theme.radius.md,
    },
  };
});

export default function PasswordInfoSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);

  const updateUser = async (data) => {
    try {
     await axios.patch(
        `${API_BASE_URL}/users/${currentUser.id}`,
        data
      );

    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  const changePasswordHandeler = () => {
    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(
        "confirmed password not matching the new password"
      );
      return
    } else setConfirmNewPasswordError("");
    if (oldPassword === "") {
      setOldPasswordError("Enter your old password");
      return
    } else setOldPasswordError("");
    if (newPassword === "") {
      setNewPasswordError("Enter your new password");
      return
    } else setNewPasswordError("");
    if (confirmNewPassword === "") {
      setConfirmNewPasswordError("You should confirm your new password");
      return
    } else setConfirmNewPasswordError("");
    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError(
        "Confirmed password not matching the new password"
      );
    } else {
      setConfirmNewPasswordError("");
     
  }
  updateUser({password: newPassword})
  
    // here you can add your condition (if the password is actually true (use backend hh))
    // change password
  };

  return (
    <Box className={classes.viewElement}>
      <Group position="apart" className={classes.header}>
        <Group>
          <Title size="h3" transform="uppercase">
            Change Password
          </Title>
        </Group>
      </Group>
      <Box className={classes.passwordSettings}>
        <Box mb="sm" mt="sm">
          <div style={{ marginBottom: "16px" }}>
            <Text className={classes.label} size="xs">
              Old Password
            </Text>
            <PasswordInput
              value={oldPassword}
              error={oldPasswordError}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              placeholder="*********"
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <Text className={classes.label} size="xs">
              New Password
            </Text>

            <PasswordInput
              value={newPassword}
              error={newPasswordError}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="*********"
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <Text className={classes.label} size="xs">
              Confirm New Password
            </Text>

            <PasswordInput
              value={confirmNewPassword}
              error={confirmNewPasswordError}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
              placeholder="*********"
            />
          </div>

          <Group position="right" mt={"xl"}>
            <Button onClick={changePasswordHandeler}>SAVE</Button>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}
