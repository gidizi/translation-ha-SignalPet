import { CSSProperties, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { isString } from "../utils/strings";

interface ReportSectionInterface {
  children?: ReactNode;
  title: string | ReactNode;
  secondaryText?: string | ReactNode;
  style?: CSSProperties;
  contentWrapperStyle?: CSSProperties;
}

const styles = {
  container: {
    border: "1px solid #064c60",
  },
  headerContainer: {
    backgroundColor: "#064c60",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "1%",
    paddingRight: "3%",
  },
  titleText: {
    color: "#fff",
  },
  childrenWrapper: {
    display: "inline-grid",
    width: "100%",
  },
};

const ReportSection = (props: ReportSectionInterface) => {
  const { t } = useTranslation();
  const { title, children, secondaryText, style, contentWrapperStyle } = props;
  return (
    <div style={{ ...styles.container, ...style }}>
      <div style={styles.headerContainer}>
        <span style={styles.titleText} translate="yes">
          {isString(title) ? t(title) : title}
        </span>
        <span style={styles.titleText} translate="yes">
          {isString(secondaryText) ? t(secondaryText) : secondaryText}
          {/* note: this one is failing because even as string it includes a number. translating when prop is being forwarded is wrong. need to consider different solution */}
        </span>
      </div>
      <div style={{ ...styles.childrenWrapper, ...contentWrapperStyle }}>
        {children}
      </div>
    </div>
  );
};

export default ReportSection;
