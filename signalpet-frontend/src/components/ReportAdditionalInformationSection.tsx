import React, { useState, useEffect } from "react";
import InputTag from "./InputTag";
import { useTranslation } from "react-i18next";
import axiosInstance from "../api/axiosInstance";

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
  const [analysisSummary, setAnalysisSummary] = useState<string[]>();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchSummary() {
      try {
        setAnalysisSummary([]);
        const randomTemporaryId = 91;
        const summary = await axiosInstance.get(
          `/analysis-summary/${randomTemporaryId}?lang=${i18n.language}`
        );
        setAnalysisSummary(summary.data);
      } catch (error) {
        console.error("Error fetching findings:", error);
      }
    }

    fetchSummary();

    i18n.on("languageChanged", fetchSummary);

    return () => {
      i18n.off("languageChanged", fetchSummary);
    };
  }, [i18n]);

  return (
    <div translate="yes">
      <span style={styles.title}>{t("Summary")}: </span>
      <InputTag editable={true}>{analysisSummary}</InputTag>
    </div>
  );
};

export default ReportAdditionalInformationSection;
