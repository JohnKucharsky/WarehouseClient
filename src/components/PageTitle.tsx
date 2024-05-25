import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function PageTitle({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t(title)}</title>
      </Helmet>
      {children}
    </>
  );
}
