import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { $user, logoutFx } from "src/features/auth/data/api.ts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function LogoutButton() {
  const [logout, user] = useUnit([logoutFx, $user]);

  const { t } = useTranslation();

  if (!user) {
    return <></>;
  }
  return (
    <Tooltip title={t("Logout")}>
      <IconButton onClick={logout}>
        <ExitToAppIcon />
      </IconButton>
    </Tooltip>
  );
}
