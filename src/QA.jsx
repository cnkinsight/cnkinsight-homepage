export default function QA({ q, a }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <details>
        <summary className="w-full text-left flex items-center justify-between cursor-pointer">
          <span className="font-semibold">{q}</span>
          <span className="ck-brand text-xl ml-2">+</span>
        </summary>
        <div
          className="mt-3 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: a }}   // <br/>, <p> 등 HTML 반영
        />
      </details>
    </div>
  );
}
