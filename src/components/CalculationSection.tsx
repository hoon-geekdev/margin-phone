import React from "react";
import { InputField } from "./InputField";

interface CalculationSectionProps {
  title: string;
  icon: string;
  inputs: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }[];
  results: {
    label: string;
    value: number;
    isHighlight?: boolean;
  }[];
}

export const CalculationSection: React.FC<CalculationSectionProps> = ({
  title,
  icon,
  inputs,
  results,
}) => {
  const formatNumber = (num: number): string => {
    return num.toLocaleString("ko-KR");
  };

  return (
    <div className="card p-6 space-y-6 fade-in">
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h2 className="section-title text-center">{title}</h2>
      </div>

      {/* 입력 필드들 */}
      <div className="space-y-4">
        {inputs.map((input, index) => (
          <InputField
            key={index}
            label={input.label}
            value={input.value}
            onChange={input.onChange}
          />
        ))}
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          계산 결과
        </h3>

        {/* 결과 표시 */}
        <div className="space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg ${
                result.isHighlight
                  ? "bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {result.label}
              </span>
              <span
                className={`text-lg font-bold ${
                  result.isHighlight
                    ? "text-primary-600 dark:text-primary-400"
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
  );
};
