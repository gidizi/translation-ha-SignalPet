import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { selectRandomObjects } from 'src/utils/objects';
import { getRandomNumberInRange } from 'src/utils/numbers';
import { Findings } from 'src/models/finding';
import { randomXrayFinding } from 'src/utils/strings';

@Injectable()
export class FindingsService {
  public abnormalFindings: any[] = [];
  public normalFindings: any[] = [];

  constructor() {
    this.loadAllData();
  }

  public getFindings(
    isNormal: boolean,
    quantityRange: [number, number],
    generatedQuantityRange: [number, number],
  ): Findings {
    let localFindings: Findings = [];
    localFindings = localFindings.concat(
      selectRandomObjects(
        isNormal ? this.normalFindings : this.abnormalFindings,
        getRandomNumberInRange(...quantityRange),
      ),
    );

    for (
      let i = 0;
      i < getRandomNumberInRange(...generatedQuantityRange);
      i++
    ) {
      localFindings = localFindings.concat(randomXrayFinding(isNormal));
    }

    return localFindings;
  }

  private loadAllData() {
    const fileMapping = {
      abnormalFindings: 'fetchAbnormalFindings.json', // todo: change the names after the logic will work
      normalFindings: 'fetchNormalFindings.json',
    };

    Object.entries(fileMapping).forEach(([variableName, fileName]) => {
      const filePath = path.join(__dirname, '..', 'data', fileName);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        this[variableName] = JSON.parse(data);
      } else {
        console.warn(
          `File ${fileName} at ${filePath} not found. Skipping initialization for ${variableName}.`,
        );
      }
    });
  }

  getNormalFindingById(id: number) {
    //id will be used in an actual app when data isn't randomly generate
    return this.getFindings(true, [0, 7], [0, 5]);
  }

  getAbormalFindingById(id: number) {
    //id will be used in an actual app when data isn't randomly generate
    return this.getFindings(false, [0, 7], [0, 5]);
  }
}