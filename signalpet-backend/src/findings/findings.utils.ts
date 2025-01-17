import { Findings, FindingDTO } from 'src/models/finding';

export const convertToDto = async (
  findings: Findings,
  translatedNames: string[],
): Promise<FindingDTO[]> => {
  return findings.map((item, index) => ({
    id: item.id,
    isNormal: item.isNormal,
    isAbnormal: item.isAbnormal,
    isLikely: item.isLikely,
    name: translatedNames[index],
  }));
};
