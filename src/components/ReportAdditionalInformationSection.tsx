import InputTag from "./InputTag";
import { generateXrayAnalysisSummary } from "../utils/strings";
import { useTranslation } from "react-i18next";

const styles = {
  title: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    paddingRight: "10%",
    alignSelf: "center",
    justifyCenter: "center",
    alignText: "center",
  },
};

const ReportAdditionalInformationSection = () => {
  const { t } = useTranslation();
  return (
    <div translate="yes">
      <span style={styles.title}>{t("Summary")}: </span>
      <InputTag editable={true}>{generateXrayAnalysisSummary()}</InputTag>
    </div>
  );
};

export default ReportAdditionalInformationSection;
