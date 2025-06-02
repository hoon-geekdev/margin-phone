import React, { useState } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import { SaveLoadModal } from "./components/SaveLoadModal";
import { InputField } from "./components/InputField";

const Calculator: React.FC = () => {
  const {
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
    isDarkMode,
    toggleDarkMode,
    calculationResults,
  } = useAppContext();

  const [showModal, setShowModal] = useState(false);

  const handleReset = () => {
    if (window.confirm("모든 입력값을 초기화하시겠습니까?")) {
      setLeftOpeningAmount("0");
      setLeftRebate("0");
      setLeftCashReceipt("0");
      setLeftDeductionPolicy("0");
      setLeftVatAndPolicy("0");
      setRightRebate("0");
      setRightAdditionalPolicy("0");
      setRightGiftCard("0");
      setRightPayback("0");
      setMemo("");
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  const leftInputs = [
    {
      label: "개통원금",
      value: leftOpeningAmount,
      onChange: setLeftOpeningAmount,
    },
    { label: "리베이트", value: leftRebate, onChange: setLeftRebate },
    { label: "현금수납", value: leftCashReceipt, onChange: setLeftCashReceipt },
    {
      label: "차감정책",
      value: leftDeductionPolicy,
      onChange: setLeftDeductionPolicy,
    },
    {
      label: "부가 및 추가정책",
      value: leftVatAndPolicy,
      onChange: setLeftVatAndPolicy,
    },
  ];

  const leftResults = [
    { label: "정산금", value: calculationResults.leftSettlement },
    { label: "부가세/원천", value: calculationResults.leftVatWithholding },
    { label: "마진", value: calculationResults.leftMargin, isHighlight: true },
  ];

  const rightInputs = [
    { label: "리베이트", value: rightRebate, onChange: setRightRebate },
    {
      label: "추가 정책",
      value: rightAdditionalPolicy,
      onChange: setRightAdditionalPolicy,
    },
    { label: "상품권 지급", value: rightGiftCard, onChange: setRightGiftCard },
    { label: "페이백", value: rightPayback, onChange: setRightPayback },
  ];

  const rightResults = [
    { label: "정산금", value: calculationResults.rightSettlement },
    { label: "부가세/원천", value: calculationResults.rightVatWithholding },
    { label: "마진", value: calculationResults.rightMargin, isHighlight: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 헤더 */}
        <header className="text-center mb-8 slide-up">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-5xl">📱</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
              핸드폰 마진 계산기
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            단말기와 유선 개통 마진을 정확하게 계산하는 전문 도구
          </p>

          {/* 액션 버튼들 */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              💾 저장/불러오기
            </button>
            <button onClick={handleReset} className="btn btn-danger">
              🔄 초기화
            </button>
            <button onClick={toggleDarkMode} className="btn btn-secondary">
              {isDarkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
            </button>
          </div>
        </header>

        {/* 메모 입력 */}
        <div className="card p-6 mb-8 slide-up">
          <h2 className="section-title">📝 메모</h2>
          <InputField
            label="메모 (저장 구분값으로 사용됩니다)"
            value={memo}
            onChange={setMemo}
            type="textarea"
            placeholder="계산 내용에 대한 메모를 입력하세요..."
          />
        </div>

        {/* 계산 섹션 제목 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              📱 단말기 (왼쪽)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              개통원금 기반 마진 계산
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              📞 유선 (오른쪽)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              리베이트 기반 마진 계산
            </p>
          </div>
        </div>

        {/* 계산 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            {/* 단말기 입력 섹션 */}
            <div className="card p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                📱 단말기 입력값
              </h3>
              <div className="space-y-4">
                {leftInputs.map((input, index) => (
                  <InputField
                    key={index}
                    label={input.label}
                    value={input.value}
                    onChange={input.onChange}
                  />
                ))}
              </div>
            </div>

            {/* 단말기 결과 섹션 */}
            <div className="card p-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-4">
                📊 단말기 계산 결과
              </h3>
              <div className="space-y-3">
                {leftResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      result.isHighlight
                        ? "bg-blue-100 dark:bg-blue-800/30 border border-blue-300 dark:border-blue-600"
                        : "bg-white dark:bg-gray-700"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {result.label}
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        result.isHighlight
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {formatNumber(result.value)}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* 유선 입력 섹션 */}
            <div className="card p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                📞 유선 입력값
              </h3>
              <div className="space-y-4">
                {rightInputs.map((input, index) => (
                  <InputField
                    key={index}
                    label={input.label}
                    value={input.value}
                    onChange={input.onChange}
                  />
                ))}
              </div>
            </div>

            {/* 유선 결과 섹션 */}
            <div className="card p-6 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">
                📊 유선 계산 결과
              </h3>
              <div className="space-y-3">
                {rightResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      result.isHighlight
                        ? "bg-green-100 dark:bg-green-800/30 border border-green-300 dark:border-green-600"
                        : "bg-white dark:bg-gray-700"
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {result.label}
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        result.isHighlight
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {formatNumber(result.value)}원
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 총 마진 */}
        <div className="card p-8 text-center slide-up border-2 border-yellow-400 dark:border-yellow-500">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            💰 총 마진
          </h2>
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 animate-pulse-soft">
            {formatNumber(calculationResults.totalMargin)}원
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            단말기 마진 ({formatNumber(calculationResults.leftMargin)}원) + 유선
            마진 ({formatNumber(calculationResults.rightMargin)}원)
          </p>
        </div>

        {/* 푸터 */}
        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p>
            © 2024 핸드폰 마진 계산기. 모든 데이터는 로컬에 안전하게 저장됩니다.
          </p>
        </footer>
      </div>

      {/* 모달 */}
      <SaveLoadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Calculator />
    </AppProvider>
  );
};

export default App;
