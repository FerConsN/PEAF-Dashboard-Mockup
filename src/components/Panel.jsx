export default function Panel({ id, eyebrow, title, badge, children }) {
  return (
    <section className="panel" aria-labelledby={id}>
      <div className="panel-heading">
        <div><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>
        <span className="tag">{badge}</span>
      </div>
      {children}
    </section>
  )
}
