import { useUnit } from "effector-react";
import { $user, getMeEv, setUserEv } from "src/features/auth/data/api.ts";
import { useEffect, useState } from "react";
import { Button, Dialog } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setAuthOpenedEv } from "src/features/auth/data/store.ts";
import Cookies from "js-cookie";
import UserInfo from "src/features/auth/UserInfo.tsx";

export default function AuthButton() {
  const [user, getUser, handleOpenAuth, setUser] = useUnit([
    $user,
    getMeEv,
    setAuthOpenedEv,
    setUserEv,
  ]);
  const [userInfoOpened, setUserInfoOpened] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (Cookies.get("logged_in")) {
      getUser();
    }
  }, [getUser]);

  useEffect(() => {
    if (!Cookies.get("logged_in")) {
      user && setUser(null);
    }
  }, [setUser, user]);

  if (!user) {
    return (
      <Button size={"small"} onClick={() => handleOpenAuth("login")}>
        {t("Enter")}
      </Button>
    );
  }

  return (
    <>
      <Dialog open={userInfoOpened} onClose={() => setUserInfoOpened(false)}>
        <UserInfo user={user} />
      </Dialog>
      <Button
        onClick={() => setUserInfoOpened(true)}
      >{`${user.name} ${user.last_name}`}</Button>
    </>
  );
}
