import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
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

export default function TopLine() {
  const [toggleColorMode] = useUnit([toggleColorModeEv]);

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
      <Box
        display={"grid"}
        gridTemplateColumns={"auto 1fr auto auto"}
        gap={2}
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

        <Box />

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
      </Box>
    </>
  );
}
