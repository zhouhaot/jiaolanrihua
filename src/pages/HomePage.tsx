import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

const featureCards = [
  {
    title: '极速发货',
    description: '全国重点城市次日达，支持门店自提和时段配送。',
    tone: 'from-[#d6e7ff] to-[#eef4ff]'
  },
  {
    title: '正品保障',
    description: '品牌官方授权链路，批次可追溯，支持验真。',
    tone: 'from-[#ffe7d7] to-[#fff4ec]'
  },
  {
    title: '专业建议',
    description: '按肤质和场景推荐搭配，降低试错成本。',
    tone: 'from-[#def6ea] to-[#f1fbf6]'
  },
  {
    title: '会员权益',
    description: '积分返利、生日礼遇、专属活动优先参与。',
    tone: 'from-[#ede2ff] to-[#f7f2ff]'
  }
]

const HomePage = () => {
  return (
    <div>
      <Hero />

      <section className="container-app pb-10" id="story">
        <div className="bento">
          {featureCards.map((item, index) => (
            <article
              key={item.title}
              className={`bento-item fade-in-up col-span-12 bg-gradient-to-br ${item.tone} md:col-span-6 lg:col-span-3`}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <p className="text-sm font-semibold text-slate-500">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-app pb-16" id="hot">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="pill">Hot Picks</p>
            <h2 className="section-title mt-3">本周热门商品</h2>
            <p className="section-subtitle mt-2">基于近 7 日浏览、加购和转化数据动态排序。</p>
          </div>
        </div>
        <ProductList />
      </section>
    </div>
  )
}

export default HomePage