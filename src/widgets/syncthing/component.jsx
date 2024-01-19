import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

function hasField(fields, fieldTypes) {
  return fields.some(field => fieldTypes.includes(field));
}

export default function Component({ service }) {
  const { t } = useTranslation();
  let data = {};

  const { widget } = service;
  const fields = widget.fields ?? ["files", "devices", "completion"];

  // Different fields require different API calls
  const reportFields = ["stored", "folders", "files", "devices"];
  const completionFields = ["completion"];

  if (hasField(fields, reportFields)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: reportData, error: reportError } = useWidgetAPI(widget, "report");
    if (reportError) {
      return <Container service={service} error={reportError} />;
    }  
    data = { ...data, stored: reportData?.totMiB, folders: reportData?.numFolders, files: reportData?.totFiles, devices: reportData?.numDevices};
  }
  
  if (hasField(fields, completionFields)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: completion, error: completionError } = useWidgetAPI(widget, "completion");
    if (completionError) {
      return <Container service={service} error={completionError} />;
    }
    data = { ...data, completion: completion?.completion};
  }

  // const connectionsFields = ["connected"];
  // if (hasField(fields, connectionsFields)) {
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const { data: connectionsData, error: connectionsError } = useWidgetAPI(widget, "connections");
    // if (connectionsError) {
      // return <Container service={service} error={connectionsError} />;
    // }
    // const connectionsDevice = Object.assign(connectionsData.connections);
    // const connectedInfo = Object.keys(connectionsDevice).reduce((acc, id) => {
      		// if (connectionsDevice[id].connected === true) {acc.numConnected += 1;}
        	// return acc;
        // }, { numConnected: 0,});
    // data = { ...data, connected: connectedInfo?.numConnected};
  // }
   
  return (
    <Container service={service}>
      {fields.map((field) =>
       <Block key={field} label={`syncthing.${field}`} value={data[field] ? t("common.number", { value: data[field] }) : '-'} />
      )}
    </Container>
  );
}