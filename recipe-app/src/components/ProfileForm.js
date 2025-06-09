import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Box, TextField } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const ProfileForm = forwardRef((props, ref) => {
  const { user } = useContext(UserContext);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setProfile({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user]);

  useImperativeHandle(ref, () => ({
    getProfileData: () => profile,
  }));

  const validateField = (field, value) => {
    let message = "";
    if (!value.trim()) {
      message = "This field is required";
    } else if (
      field === "email" &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    ) {
      message = "Invalid email address";
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    validateField(field, value);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}>
      <TextField
        label="First Name"
        value={profile.firstName}
        onChange={handleChange("firstName")}
        variant="outlined"
        fullWidth
        error={Boolean(errors.firstName)}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={profile.lastName}
        onChange={handleChange("lastName")}
        variant="outlined"
        fullWidth
        error={Boolean(errors.lastName)}
        helperText={errors.lastName}
      />
      <TextField
        label="Email"
        value={profile.email}
        onChange={handleChange("email")}
        variant="outlined"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email}
      />
    </Box>
  );
});

export default ProfileForm;
