const nav = [
  { title: "مصالح ساختمای" },
  { title: "تاسیسات" },
  { title: "ابزار و یراق" },
  { title: "درب و پنجره" },
  { title: "آهن آلات" }
]
const Navigation = () => {
  return (
    <ol className="flex items-center gap-1">
      {nav.map((item, idx) => (
        <li key={idx}>
          <a href="" className="inline-flex px-3 py-2">
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  )
}

export default Navigation
