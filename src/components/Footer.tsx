const columns = [
  {
    title: '客户服务',
    links: ['帮助中心', '配送说明', '退换政策', '支付方式']
  },
  {
    title: '品牌信息',
    links: ['品牌故事', '门店体验', '合作联系', '加入我们']
  },
  {
    title: '购物指南',
    links: ['新手指南', '积分规则', '隐私政策', '用户协议']
  }
]

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/80 py-12">
      <div className="container-app">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold text-slate-900">娇兰日化</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              用现代化体验连接高品质日化产品，让每次购买都更高效、更安心、更有愉悦感。
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-bold text-slate-900">{column.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {column.links.map((link) => (
                  <li key={link} className="transition hover:text-slate-900">
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 娇兰日化. All Rights Reserved.</p>
          <p>备案号：浙ICP备12345678号-1</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer