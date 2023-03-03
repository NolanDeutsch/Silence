import { Grid, Stack, Typography } from "@mui/material";
import Button from "components/Button";
import { CustomAvatar, CustomAvatarGroup } from "components/custom-avatar";
import { useRouter } from "next/router";
import React from "react";
import { Container, DetailsContainer, UserContainer } from "./styled";

const GroupItem = ({ name, id, isAccepted, onJoin, onDecline, users, userCount, postCount }) => {
  const router = useRouter();

  const handleSelect = () => isAccepted && router.push(`groups/${id}`);

  return (
    <Container role="button" onClick={handleSelect}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <CustomAvatar src="" name={name} />
        <Typography>{name}</Typography>
      </Stack>
      {!isAccepted ? (
        <Stack direction="row" spacing={2}>
          <Button size="small" color="success" onClick={() => onJoin(id)}>
            Join
          </Button>
          <Button size="small" color="error" onClick={() => onDecline(id)}>
            Decline
          </Button>
        </Stack>
      ) : (
        <DetailsContainer>
          <UserContainer>
            <CustomAvatarGroup max={5}>
              {users?.map((user) => (
                <CustomAvatar src={user.image} name={user.firstName} />
              ))}
            </CustomAvatarGroup>
            <Typography variant="subtitle1">{userCount} members</Typography>
          </UserContainer>
          <span>
            <Typography variant="subtitle1" display="inline">
              {postCount}&nbsp;
            </Typography>
            <Typography variant="subtitle1" display="inline">
              posts
            </Typography>
          </span>
        </DetailsContainer>
      )}
    </Container>
  );
};

export default GroupItem;