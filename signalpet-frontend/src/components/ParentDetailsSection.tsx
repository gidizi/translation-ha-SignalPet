import { CSSProperties, useEffect, useState } from "react";
import InputTag from "./InputTag";
import { PatientDetailsModel, patientId } from "../models/patientDetails";
import { convertToReadableString } from "../utils/strings";
import { getRandomNumberInRange } from "../utils/numbers";
import { loadingText } from "../utils/constants";
import { useTranslation } from "react-i18next";

const styles = {
  container: {
    display: "inline-grid",
    gridTemplateColumns: "1fr 1fr",
    width: "98%",
    paddingLeft: "2%",
    paddingBottom: "2%",
  },
  detailContainer: {},
  detailTitle: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 600,
    paddingRight: "10%",
  },
};

interface ParentDetailsSectionInterface {
  patientId: patientId;
  style?: CSSProperties;
}

const ParentDetailsSection = (props: ParentDetailsSectionInterface) => {
  const { patientId, style } = props;
  const [details, setDetails] = useState<PatientDetailsModel>();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      //note: this functionality needs to move to the back. it doesn't requires translation though so it wasn't significant for the task
      setDetails(require("../fetches/fetchPatientDetails.json")[patientId]);
    }, getRandomNumberInRange(200, 1800));
  });

  return (
    <div style={{ ...styles.container, ...style }}>
      {details ? (
        Object.keys(details).map((field) => (
          <div key={field} style={styles.detailContainer}>
            <span style={styles.detailTitle} translate="yes">
              {t(convertToReadableString(field))}
            </span>
            <InputTag>{details[field as keyof typeof details]}</InputTag>
          </div>
        ))
      ) : (
        <span translate="yes">{t(loadingText)}</span>
      )}
    </div>
  );
};

export default ParentDetailsSection;
