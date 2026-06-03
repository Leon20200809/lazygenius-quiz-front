export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            LazyGenius Quiz
          </p>
          <p className="text-lg font-bold text-gray-950">
            Web開発用語クイズ
          </p>
        </div>

        <nav aria-label="メインナビゲーション">
          <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-gray-600">
            MVP
          </span>
        </nav>
      </div>
    </header>
  );
}