export interface SavedData {
  id: string;
  memo: string;
  timestamp: string;
  leftOpeningAmount: string;
  leftRebate: string;
  leftCashReceipt: string;
  leftDeductionPolicy: string;
  leftVatAndPolicy: string;
  rightRebate: string;
  rightAdditionalPolicy: string;
  rightGiftCard: string;
  rightPayback: string;
}

export interface CalculationResults {
  leftSettlement: number;
  leftVatWithholding: number;
  leftMargin: number;
  rightSettlement: number;
  rightVatWithholding: number;
  rightMargin: number;
  totalMargin: number;
}

export interface AppContextType {
  // 왼쪽 (단말기) 입력 필드들
  leftOpeningAmount: string;
  setLeftOpeningAmount: React.Dispatch<React.SetStateAction<string>>;
  leftRebate: string;
  setLeftRebate: React.Dispatch<React.SetStateAction<string>>;
  leftCashReceipt: string;
  setLeftCashReceipt: React.Dispatch<React.SetStateAction<string>>;
  leftDeductionPolicy: string;
  setLeftDeductionPolicy: React.Dispatch<React.SetStateAction<string>>;
  leftVatAndPolicy: string;
  setLeftVatAndPolicy: React.Dispatch<React.SetStateAction<string>>;

  // 오른쪽 (유선) 입력 필드들
  rightRebate: string;
  setRightRebate: React.Dispatch<React.SetStateAction<string>>;
  rightAdditionalPolicy: string;
  setRightAdditionalPolicy: React.Dispatch<React.SetStateAction<string>>;
  rightGiftCard: string;
  setRightGiftCard: React.Dispatch<React.SetStateAction<string>>;
  rightPayback: string;
  setRightPayback: React.Dispatch<React.SetStateAction<string>>;

  // 메모와 저장 데이터
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
  savedDataList: SavedData[];
  setSavedDataList: React.Dispatch<React.SetStateAction<SavedData[]>>;

  // 다크모드
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // 계산 결과
  calculationResults: CalculationResults;
}
