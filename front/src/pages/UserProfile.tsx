import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Card, Grid, styled, Tab, TextField } from "@mui/material";
import FlexBox from "../components/FlexBox";
import SearchInput from "../components/SearchInput";
import { H3, Small } from "../components/Typography";
import UkoAvatar from "../components/UkoAvatar";
import FollowerCard from "../components/userProfile/FollowerCard";
import FriendCard from "../components/userProfile/FriendCard";
import Gallery from "../components/userProfile/Gallery";
import Profile from "../components/userProfile/Profile";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import { FC, SyntheticEvent, useState } from "react";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";

// styled components
const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: "center",
  position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

const UserProfile: FC = () => {
  // change navbar title
  useTitle("Mon Profil");
  const { user } = useAuth();

  const [value, setValue] = useState("1");

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const api = useApi();

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (newPassword === oldPassword) {
      setError("Le nouveau mot de passe doit être différent de l'ancien");
      return;
    }

    let res;

    try {
      res = await api
        .updatePassword(user?.id, {
          oldPassword,
          newPassword,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setError("");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.success("Mot de passe modifié avec succès");
          } else {
            setError("L'ancien mot de passe est incorrect");
          }
        });
    } catch (e) {
      setError("L'ancien mot de passe est incorrect");
    }

    console.log(res);
  };
  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <StyledCard>
          <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
            <img
              src="/static/background/user-cover-pic.png"
              alt="User Cover"
              height="100%"
              width="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>

          <FlexBox
            flexWrap="wrap"
            padding="0 2rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <ContentWrapper>
              <UkoAvatar
                src={user?.avatar || "/static/avatar/001-man.svg"}
                sx={{
                  border: 4,
                  width: 100,
                  height: 100,
                  borderColor: "background.paper",
                }}
              />

              <Box marginLeft={3} marginTop={3}>
                <H3 lineHeight={1.2}>{user?.name}</H3>
                <Small color="text.disabled">{user?.firstname}</Small>
              </Box>
            </ContentWrapper>

            <StyledTabList onChange={handleChange}>
              <StyledTab label="Profile" value="1" />
              <StyledTab label="Paramètres" value="2" />
              <StyledTab label="                " value="3" />
              <StyledTab label="                " value="4" />
            </StyledTabList>
          </FlexBox>
        </StyledCard>

        <Box marginTop={3}>
          <StyledTabPanel value="1">
            <Profile />
          </StyledTabPanel>

          <StyledTabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value={oldPassword}
                  label="L'ancien mot de passe"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value={newPassword}
                  label="Nouveau mot de passe"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  value={confirmPassword}
                  label="Confirmer le nouveau mot de passe"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              {error && (
                <Grid item xs={12} md={12}>
                  <Small color="error.main">{error}</Small>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={changePassword}
                >
                  Sauvegarder
                </Button>
              </Grid>
            </Grid>
          </StyledTabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default UserProfile;
