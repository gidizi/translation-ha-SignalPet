// eslint-disable-next-line @typescript-eslint/consistent-type-imports, @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from "react";
import { Checkbox2 } from "./ui/checkbox";
import { type Finding, type Findings } from "../models/finding";
import axiosInstance from "../api/axiosInstance";
import { useTranslation } from "react-i18next";
import { loadingText } from "../utils/constants";

const styles = {
  gap3: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "0.75rem", // Equivalent to 3 * 0.25rem
    padding: "0.75rem", // Equivalent to 3 * 0.25rem
  },
  smGap4: {
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem", // Equivalent to 2 * 0.25rem
    alignItems: "center",
  },
  smRoundedW8: {
    width: "1.5rem", // Equivalent to w-6
    height: "0.375rem", // Equivalent to h-1.5
    borderRadius: "9999px", // Equivalent to rounded-full
    border: "1px solid #ccc", // Default border color for unfilled state
  },
  gap4: {
    display: "flex",
    alignItems: "center",
    gap: "1rem", // Equivalent to gap-4
  },
  gap25: {
    display: "flex",
    gap: "0.625rem", // Equivalent to gap-2.5
  },
};

interface ReportFindingsProps {
  findings?: Findings;
  isNormal: boolean;
  editable: boolean;
}

const ReportFindings = ({
  findings,
  isNormal,
  editable,
}: ReportFindingsProps): JSX.Element => {
  const [findingsData, setFindingsData] = useState<Finding[]>(); //very explicit name mainly to separate from the orig var for easier review

  const { t, i18n } = useTranslation();

  useEffect(() => {
    async function fetchFindings() {
      try {
        setFindingsData([]);
        const randomTemporaryId = 91;
        const urlSubPath = isNormal ? "normal" : "abnormal";
        const findings = await axiosInstance.get(
          `/findings/${urlSubPath}/${randomTemporaryId}?lang=${i18n.language}`
        );
        setFindingsData(findings.data);
      } catch (error) {
        console.error("Error fetching findings:", error);
      }
    }

    fetchFindings();

    i18n.on("languageChanged", fetchFindings);

    return () => {
      i18n.off("languageChanged", fetchFindings);
    };
  }, [i18n]);

  // findings = findings ? findings : getFindings(isNormal, [0, 7], [0, 5]);
  //note: we disallowed the case of providing findings as a prop for now. we don't see any flow that uses it anyway as part of the tasks scope
  return (
    <div style={styles.gap3}>
      {findingsData && findingsData.length != 0 ? (
        findingsData.map((finding) =>
          editable || !editable ? (
            <div key={finding.id} style={styles.smGap4}>
              <ReportFinding
                finding={finding}
                isNormal={isNormal}
                editable={editable}
                checked={editable}
              />
            </div>
          ) : (
            <></>
          )
        )
      ) : (
        <span>{t(loadingText)}</span>
      )}
      <span></span>
    </div>
  );
};

const Pill = ({
  filled,
  isNormal,
  checked,
}: {
  filled: boolean;
  isNormal: boolean;
  checked: boolean;
}): JSX.Element => {
  return (
    <div
      style={{
        ...styles.smRoundedW8,
        backgroundColor: filled
          ? isNormal
            ? checked
              ? "#00A95E" // Equivalent to bg-report-green
              : "#9DD1A4" // Equivalent to bg-report-light-green
            : checked
            ? "#E53E3E" // Equivalent to bg-report-red
            : "#FED7D7" // Equivalent to bg-report-light-red
          : "transparent", // Equivalent to border border-gray-400
      }}
    ></div>
  );
};

const ReportFinding = ({
  finding,
  isNormal,
  editable,
  checked,
}: {
  finding: Finding;
  isNormal: boolean;
  editable: boolean;
  checked: boolean;
}): JSX.Element => {
  const [checkedStatus, setCheckedStatus] = useState<boolean>(checked);

  const onCheckedChange = () => {
    setCheckedStatus(!checkedStatus);
  };

  return (
    <>
      <div style={styles.gap4}>
        {editable && (
          <Checkbox2
            checked={checkedStatus}
            onCheckedChange={onCheckedChange}
          />
        )}
        <div
          style={{
            color: checkedStatus
              ? "text-sp-dark-blue"
              : "text-report-light-gray ",
          }}
          translate="yes"
        >{`${finding.name}`}</div>
      </div>
      <div style={styles.gap25}>
        <Pill filled={true} isNormal={isNormal} checked={checked} />
        <Pill filled={true} isNormal={isNormal} checked={checked} />
        <Pill
          filled={!finding.isLikely}
          isNormal={isNormal}
          checked={checked}
        />
        <Pill
          filled={!finding.isLikely}
          isNormal={isNormal}
          checked={checked}
        />
      </div>
    </>
  );
};

export default ReportFindings;
