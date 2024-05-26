import { Box, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { User } from "src/features/auth/data/types.ts";
import { useTranslation } from "react-i18next";

export default function UserInfo({ user }: { user: User }) {
  const { t } = useTranslation();

  return (
    <Box p={2}>
      {(
        [
          { key: "id", title: "id" },
          { key: "name", title: "personName" },
          { key: "last_name", title: "lastName" },
          { key: "middle_name", title: "middleName" },
          { key: "email", title: "Email" },
          { key: "created_at", title: "createdAt" },
        ] as const
      ).map((item) => (
        <Stack
          direction={"row"}
          spacing={2}
          justifyContent={"space-between"}
          key={item.key}
        >
          <Typography>{t(item.title)}</Typography>
          <Typography>
            {item.key === "created_at"
              ? dayjs(user[item.key]).format("DD-MM-YYYY")
              : user[item.key]}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
