"use client";

import { useState, useEffect } from "react";

const FONT_SIZES = [
  { label: "標準 (16px)", value: "text-base" },
  { label: "大 (24px)", value: "text-2xl" },
  { label: "特大 (32px)", value: "text-4xl" },
];

const STORAGE_KEYS = {
  FONT_SIZE: "md-memo-font-size",
  MEMO: "md-memo-content",
  AUTO_SAVE: "md-memo-auto-save",
} as const;

export default function Home() {
  const [memo, setMemo] = useState("");
  // const [isPreview, setIsPreview] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");

  // 初期値の読み込み
  useEffect(() => {
    const savedFontSize = localStorage.getItem(STORAGE_KEYS.FONT_SIZE);
    const savedMemo = localStorage.getItem(STORAGE_KEYS.MEMO);
    const savedAutoSave = localStorage.getItem(STORAGE_KEYS.AUTO_SAVE);

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedMemo) setMemo(savedMemo);
    if (savedAutoSave) setIsAutoSave(savedAutoSave === "true");
  }, []);

  // 文字サイズの保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize);
  }, [fontSize]);

  // 自動保存が有効な場合の本文の保存
  useEffect(() => {
    if (isAutoSave) {
      localStorage.setItem(STORAGE_KEYS.MEMO, memo);
    }
  }, [memo, isAutoSave]);

  // 自動保存フラグの保存と本文のリセット
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTO_SAVE, String(isAutoSave));
    if (!isAutoSave) {
      localStorage.removeItem(STORAGE_KEYS.MEMO);
    }
  }, [isAutoSave]);

  // ページ離脱時の確認ダイアログ
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isAutoSave && memo.trim() !== "") {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAutoSave, memo]);

  return (
    <main className="h-screen flex flex-col">
      <header className="border-b p-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h1 className="text-2xl font-bold">メモ</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors focus:outline-none cursor-pointer hidden sm:block"
              >
                {FONT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              {/* <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                {isPreview ? "編集" : "プレビュー"}
              </button> */}
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
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {/* {isPreview ? (
          <div
            className={`prose max-w-none h-full p-4 overflow-auto ${fontSize}`}
          >
            {memo}
          </div>
        ) : ( */}
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className={`w-full h-full p-4 focus:outline-none resize-none ${fontSize}`}
          placeholder="メモを入力してください..."
        />
        {/* )} */}
      </div>
    </main>
  );
}
