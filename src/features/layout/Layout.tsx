import { Outlet } from "react-router";
import {
  Box,
  createTheme,
  css,
  CssBaseline,
  styled,
  ThemeProvider,
} from "@mui/material";
import { useMemo } from "react";
import { useUnit } from "effector-react";
import { $colorMode } from "src/features/layout/store.ts";
import TopLine from "src/components/TopLine.tsx";
import { ruRU, enUS } from "@mui/material/locale";

import { useTranslation } from "react-i18next";

const MainWrapper = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    min-height: 100vh;
    height: 100%;
  `,
);

export default function Layout() {
  const [mode] = useUnit([$colorMode]);
  const { i18n } = useTranslation();

  const theme = useMemo(() => {
    const possibleLocales = { ruRU, enUS };
    return createTheme(
      { palette: { mode } },
      possibleLocales[i18n.language as "ruRU" | "enUS"],
    );
  }, [i18n.language, mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainWrapper>
        <Box px={{ xs: 1, md: 2 }} pt={1} maxWidth={"100rem"} mx={"auto"}>
          <TopLine />
        </Box>
        <Box p={{ xs: 1, md: 2 }} maxWidth={"100rem"} mx={"auto"}>
          <Outlet />
        </Box>
      </MainWrapper>
    </ThemeProvider>
  );
}
