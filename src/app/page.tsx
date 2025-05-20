"use client";

import { useState } from "react";

const FONT_SIZES = [
  { label: "標準 (16px)", value: "text-base" },
  { label: "大 (24px)", value: "text-2xl" },
  { label: "特大 (32px)", value: "text-4xl" },
];

export default function Home() {
  const [memo, setMemo] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");

  return (
    <main className="h-screen flex flex-col">
      <header className="border-b p-4 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">MDメモ</h1>
          <div className="flex gap-4 items-center">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors focus:outline-none cursor-pointer"
            >
              {FONT_SIZES.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              {isPreview ? "編集" : "プレビュー"}
            </button>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAutoSave}
                onChange={(e) => setIsAutoSave(e.target.checked)}
                className="w-4 h-4"
              />
              <span>自動保存</span>
            </label>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {isPreview ? (
          <div
            className={`prose max-w-none h-full p-4 overflow-auto ${fontSize}`}
          >
            {/* プレビュー表示部分は後で実装 */}
            {memo}
          </div>
        ) : (
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className={`w-full h-full p-4 focus:outline-none resize-none ${fontSize}`}
            placeholder="メモを入力してください..."
          />
        )}
      </div>
    </main>
  );
}
