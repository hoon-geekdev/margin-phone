import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { SavedData } from "../types";

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    memo,
    setMemo,
    savedDataList,
    setSavedDataList,
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
  } = useAppContext();

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const saveData = () => {
    if (!memo.trim()) {
      alert("메모를 입력해주세요. 메모가 저장 구분값으로 사용됩니다.");
      return;
    }

    const existingIndex = savedDataList.findIndex(
      (item) => item.memo === memo.trim()
    );

    if (existingIndex !== -1) {
      if (window.confirm("동일한 메모가 이미 존재합니다. 덮어쓰시겠습니까?")) {
        overwriteData(existingIndex);
      }
      return;
    }

    const newData: SavedData = {
      id: Date.now().toString(),
      memo: memo.trim(),
      timestamp: new Date().toLocaleString("ko-KR"),
      leftOpeningAmount,
      leftRebate,
      leftCashReceipt,
      leftDeductionPolicy,
      leftVatAndPolicy,
      rightRebate,
      rightAdditionalPolicy,
      rightGiftCard,
      rightPayback,
    };

    try {
      const updatedList = [...savedDataList, newData];
      localStorage.setItem("calculatorDataList", JSON.stringify(updatedList));
      setSavedDataList(updatedList);
      alert("데이터가 저장되었습니다.");
    } catch (error) {
      console.error("데이터 저장 실패:", error);
      alert("데이터 저장에 실패했습니다.");
    }
  };

  const overwriteData = (index: number) => {
    const updatedData: SavedData = {
      ...savedDataList[index],
      timestamp: new Date().toLocaleString("ko-KR"),
      leftOpeningAmount,
      leftRebate,
      leftCashReceipt,
      leftDeductionPolicy,
      leftVatAndPolicy,
      rightRebate,
      rightAdditionalPolicy,
      rightGiftCard,
      rightPayback,
    };

    try {
      const updatedList = [...savedDataList];
      updatedList[index] = updatedData;
      localStorage.setItem("calculatorDataList", JSON.stringify(updatedList));
      setSavedDataList(updatedList);
      alert("데이터가 업데이트되었습니다.");
    } catch (error) {
      console.error("데이터 업데이트 실패:", error);
      alert("데이터 업데이트에 실패했습니다.");
    }
  };

  const loadData = (data: SavedData) => {
    setLeftOpeningAmount(data.leftOpeningAmount || "0");
    setLeftRebate(data.leftRebate || "0");
    setLeftCashReceipt(data.leftCashReceipt || "0");
    setLeftDeductionPolicy(data.leftDeductionPolicy || "0");
    setLeftVatAndPolicy(data.leftVatAndPolicy || "0");
    setRightRebate(data.rightRebate || "0");
    setRightAdditionalPolicy(data.rightAdditionalPolicy || "0");
    setRightGiftCard(data.rightGiftCard || "0");
    setRightPayback(data.rightPayback || "0");
    setMemo(data.memo || "");
    onClose();
    alert("데이터가 불러와졌습니다.");
  };

  const deleteData = (id: string) => {
    if (confirmDelete === id) {
      try {
        const updatedList = savedDataList.filter((item) => item.id !== id);
        localStorage.setItem("calculatorDataList", JSON.stringify(updatedList));
        setSavedDataList(updatedList);
        setConfirmDelete(null);
        alert("데이터가 삭제되었습니다.");
      } catch (error) {
        console.error("데이터 삭제 실패:", error);
        alert("데이터 삭제에 실패했습니다.");
      }
    } else {
      setConfirmDelete(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="card max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            데이터 저장/불러오기
          </h2>
          <button onClick={onClose} className="btn btn-secondary">
            닫기
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {/* 저장 섹션 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              현재 데이터 저장
            </h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="저장할 메모를 입력하세요"
                className="input-field flex-1"
              />
              <button
                onClick={saveData}
                className="btn btn-success whitespace-nowrap"
              >
                저장하기
              </button>
            </div>
          </div>

          {/* 불러오기 섹션 */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              저장된 데이터 목록
            </h3>
            {savedDataList.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-gray-500 dark:text-gray-400">
                  저장된 데이터가 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {[...savedDataList]
                  .sort((a, b) => parseInt(b.id) - parseInt(a.id))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="card p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {item.memo}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.timestamp}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadData(item)}
                            className="btn btn-primary text-sm"
                          >
                            불러오기
                          </button>
                          <button
                            onClick={() => deleteData(item.id)}
                            className={`btn text-sm ${
                              confirmDelete === item.id
                                ? "btn-danger"
                                : "btn-secondary"
                            }`}
                          >
                            {confirmDelete === item.id ? "확인" : "삭제"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
