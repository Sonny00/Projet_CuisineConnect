import { BusinessCenter, Mail, Place } from "@mui/icons-material";
import { Box, Card, Divider, Grid, styled } from "@mui/material";
import FlexBox from "../FlexBox";
import MoreOptions from "../MoreOptions";
import { H3, H4, H6, Small } from "../Typography";
import FollowerIcon from "../../icons/FollowerIcon";
import UserPlusIcon from "../../icons/UserPlusIcon";
import { FC, MouseEvent, useState } from "react";
import PostCard from "./PostCard";
import useAuth from "../../hooks/useAuth";

// styled components
const IconWrapper = styled(Box)<{ color?: string }>(({ theme, color }) => ({
  width: 40,
  height: 40,
  color: "white",
  display: "flex",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color ? color : theme.palette.primary.main,
}));

const FollowWrapper = styled(Box)(() => ({
  maxWidth: 300,
  margin: "auto",
  paddingTop: 32,
  paddingBottom: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Profile: FC = () => {
  const { user } = useAuth();

  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);

  return (
    <Grid container spacing={3}>
      <Grid item md={12} xs={12}>
        <Card>
          <FollowWrapper>
            <FlexBox alignItems="center">
              <IconWrapper>
                <UserPlusIcon fontSize="small" />
              </IconWrapper>
              <Box marginLeft={1.5}>
                <H6 color="text.disabled" lineHeight={1}>
                  Formations suivies
                </H6>
                <H3 lineHeight={1} mt={0.6}>
                  {user?.Training?.length}
                </H3>
              </Box>
            </FlexBox>
            <FlexBox alignItems="center">
              <IconWrapper color="#FF9777">
                <FollowerIcon fontSize="small" />
              </IconWrapper>
              <Box marginLeft={1.5}>
                <H6 color="text.disabled" lineHeight={1}>
                  Evenement suivis
                </H6>
                <H3 lineHeight={1} mt={0.6}>
                  {user?.Event?.length}
                </H3>
              </Box>
            </FlexBox>
          </FollowWrapper>
          <Divider />
          <div
            style={{
              padding: "1rem",
            }}
          >
            <H3 padding={1} fontWeight={600}>
              Les Skills
            </H3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              {user?.skills?.map((skill: any) => (
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                  }}
                >
                  <Box padding={1} key={skill.id}>
                    <H4 fontWeight={600}>{skill.name}</H4>
                    <Small mt={1} display="block" lineHeight={1}>
                      {skill.type}
                    </Small>
                  </Box>
                </div>
              ))}
            </div>
          </div>
          <Divider />

          <Box padding={3}>
            <H4 fontWeight={600}>About</H4>
            <Small mt={1} display="block" lineHeight={1.9}>
              {user?.jobTitle}
            </Small>

            <Box mt={3}>
              {details.map(({ Icon, smallText, boldText }, index) => (
                <FlexBox alignItems="center" mt={1.5} key={index}>
                  <Icon />
                  <H6 marginLeft={1}>
                    <Small>{smallText}</Small> {boldText}
                  </H6>
                </FlexBox>
              ))}
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

const details = [
  {
    Icon: Place,
    boldText: "France",
    smallText: "",
  },
  {
    Icon: BusinessCenter,
    boldText: "",
    smallText: "5IWJ",
  },
  {
    Icon: BusinessCenter,
    boldText: "",
    smallText: "5IWJ",
  },
];

const postList = [
  {
    id: 1,
    postTitle: "Bonjour",
    postImage: "",
  },
  {
    id: 2,
    postTitle: "Test",
    postImage: "",
  },
];

export default Profile;
