import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FindingsService {
  public abnormalFindings: any[] = [];
  public normalFindings: any[] = [];

  constructor() {
    this.loadAllData();
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

  getFindingById(id: number) {
    return this.abnormalFindings[id];
  }
}
