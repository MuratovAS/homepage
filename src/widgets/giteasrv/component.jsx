import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: giteaData, error: giteaError } = useWidgetAPI(widget);

  if (giteaError) {
    return <Container service={service} error={giteaError} />;
  }

  if (!giteaData) {
    return (
      <Container service={service}>
        <Block label="giteasrv.repos" />
        <Block label="giteasrv.users" />
        <Block label="giteasrv.orgs" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="giteasrv.repos" value={t("common.number", { value: giteaData.repos })} />
      <Block label="giteasrv.users" value={t("common.number", { value: giteaData.users })} />
      <Block label="giteasrv.orgs" value={t("common.number", { value: giteaData.orgs })} />
    </Container>
  );
}