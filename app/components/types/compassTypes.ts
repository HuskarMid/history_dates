interface CompassDataList {
  id: number;
  year: string;
  title?: string;
  dates: {
    date: string;
    description: string;
  }[];
}

export type { CompassDataList };