import {
  Dialog,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useUnit } from "effector-react/compat";
import { toggleColorModeEv } from "src/features/layout/store.ts";
import { useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { paths } from "src/utils/common.ts";
import { consola } from "consola";
import AuthButton from "src/features/auth/AuthButton.tsx";
import Login from "src/features/auth/Login.tsx";
import Register from "src/features/auth/Register.tsx";
import { $authOpened, setAuthOpenedEv } from "src/features/auth/data/store.ts";
import LogoutButton from "src/features/auth/LogoutButton.tsx";
import { $user } from "src/features/auth/data/api.ts";

export default function Header() {
  const [toggleColorMode, authOpened, setAuthOpened, user] = useUnit([
    toggleColorModeEv,
    $authOpened,
    setAuthOpenedEv,
    $user,
  ]);

  const theme = useTheme();

  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const pathName = location.pathname.split("/")[1];
  const handleChangePath = (event: SelectChangeEvent) => {
    navigate(event.target.value);
  };

  const handleChangeLang = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value).catch((err) => consola.error(err));
  };

  return (
    <>
      <Dialog
        onClose={() => setAuthOpened("none")}
        open={authOpened === "login"}
      >
        <Login handleClose={() => setAuthOpened("none")} />
      </Dialog>
      <Dialog
        onClose={() => setAuthOpened("none")}
        open={authOpened === "register"}
      >
        <Register handleClose={() => setAuthOpened("none")} />
      </Dialog>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FormControl variant="standard" sx={{ minWidth: 120 }}>
          <Select value={pathName} onChange={handleChangePath}>
            {[
              paths.products,
              paths.orders,
              paths.addresses,
              paths.shelves,
              paths.assembly_info,
            ].map((item) => (
              <MenuItem key={item} value={item}>
                <Typography
                  color={(theme) => theme.palette.text.primary}
                  variant={"h5"}
                >
                  {t(item)}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction={"row"} spacing={2}>
          <IconButton
            sx={{ ml: 1, color: "text.primary" }}
            onClick={toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          <FormControl variant="standard" sx={{ minWidth: 60 }}>
            <Select value={i18n.language} onChange={handleChangeLang}>
              {["ruRU", "enUS"].map((item) => (
                <MenuItem key={item} value={item}>
                  <Typography
                    color={(theme) => theme.palette.text.primary}
                    variant={"body1"}
                  >
                    {t(item)}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <AuthButton />
          {user ? <LogoutButton /> : null}
        </Stack>
      </Stack>
    </>
  );
}
