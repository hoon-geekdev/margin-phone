import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { SavedData, AppContextType, CalculationResults } from "../types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // 왼쪽 (단말기) 입력 필드들
  const [leftOpeningAmount, setLeftOpeningAmount] = useState("0");
  const [leftRebate, setLeftRebate] = useState("0");
  const [leftCashReceipt, setLeftCashReceipt] = useState("0");
  const [leftDeductionPolicy, setLeftDeductionPolicy] = useState("0");
  const [leftVatAndPolicy, setLeftVatAndPolicy] = useState("0");

  // 오른쪽 (유선) 입력 필드들
  const [rightRebate, setRightRebate] = useState("0");
  const [rightAdditionalPolicy, setRightAdditionalPolicy] = useState("0");
  const [rightGiftCard, setRightGiftCard] = useState("0");
  const [rightPayback, setRightPayback] = useState("0");

  // 메모와 저장 데이터
  const [memo, setMemo] = useState("");
  const [savedDataList, setSavedDataList] = useState<SavedData[]>([]);

  // 다크모드
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // 계산 결과 상태
  const [calculationResults, setCalculationResults] =
    useState<CalculationResults>({
      leftSettlement: 0,
      leftVatWithholding: 0,
      leftMargin: 0,
      rightSettlement: 0,
      rightVatWithholding: 0,
      rightMargin: 0,
      totalMargin: 0,
    });

  // 숫자 변환 함수
  const parseNumber = useCallback((value: string): number => {
    const num = parseFloat(value.replace(/,/g, ""));
    return isNaN(num) ? 0 : num;
  }, []);

  // 다크모드 토글
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  }, []);

  // 다크모드 클래스 적용
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 저장된 데이터 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem("calculatorDataList");
      if (saved) {
        setSavedDataList(JSON.parse(saved));
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  }, []);

  // 계산 로직
  useEffect(() => {
    // 왼쪽 (단말기) 계산
    const openingAmount = parseNumber(leftOpeningAmount);
    const rebate = parseNumber(leftRebate);
    const cashReceipt = parseNumber(leftCashReceipt);
    const deductionPolicy = parseNumber(leftDeductionPolicy);
    const vatAndPolicy = parseNumber(leftVatAndPolicy);

    // 정산금: 리베이트 + 현금수납 + 부가 및 추가정책 - 개통원금 - 차감정책
    const leftSettlement =
      rebate + cashReceipt + vatAndPolicy - openingAmount - deductionPolicy;

    // 부가세/원천: IF(리베이트 + 부가 및 추가정책 - 차감정책) > 개통원금 ? (리베이트 + 부가 및 추가정책 - 차감정책 - 개통원금) * 10% : 0
    const leftVatWithholding =
      rebate + vatAndPolicy - deductionPolicy > openingAmount
        ? (rebate + vatAndPolicy - deductionPolicy - openingAmount) * 0.1
        : 0;

    // 마진: 정산금 - 부가세/원천
    const leftMargin = leftSettlement - leftVatWithholding;

    // 오른쪽 (유선) 계산
    const rightRebateNum = parseNumber(rightRebate);
    const additionalPolicy = parseNumber(rightAdditionalPolicy);
    const giftCard = parseNumber(rightGiftCard);
    const payback = parseNumber(rightPayback);

    // 정산금: 리베이트 + 추가정책 - 상품권지급 - 페이백
    const rightSettlement =
      rightRebateNum + additionalPolicy - giftCard - payback;

    // 부가세/원천: (리베이트 + 추가정책) * 10% (상품권, 페이백 제외)
    const rightVatWithholding = (rightRebateNum + additionalPolicy) * 0.1;

    // 마진: 정산금 - 부가세/원천
    const rightMargin = rightSettlement - rightVatWithholding;

    // 총 마진: 왼쪽 마진 + 오른쪽 마진
    const totalMargin = leftMargin + rightMargin;

    setCalculationResults({
      leftSettlement,
      leftVatWithholding,
      leftMargin,
      rightSettlement,
      rightVatWithholding,
      rightMargin,
      totalMargin,
    });
  }, [
    leftOpeningAmount,
    leftRebate,
    leftCashReceipt,
    leftDeductionPolicy,
    leftVatAndPolicy,
    rightRebate,
    rightAdditionalPolicy,
    rightGiftCard,
    rightPayback,
    parseNumber,
  ]);

  const value: AppContextType = {
    leftOpeningAmount,
    setLeftOpeningAmount,
    leftRebate,
    setLeftRebate,
    leftCashReceipt,
    setLeftCashReceipt,
    leftDeductionPolicy,
    setLeftDeductionPolicy,
    leftVatAndPolicy,
    setLeftVatAndPolicy,
    rightRebate,
    setRightRebate,
    rightAdditionalPolicy,
    setRightAdditionalPolicy,
    rightGiftCard,
    setRightGiftCard,
    rightPayback,
    setRightPayback,
    memo,
    setMemo,
    savedDataList,
    setSavedDataList,
    isDarkMode,
    toggleDarkMode,
    calculationResults,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
