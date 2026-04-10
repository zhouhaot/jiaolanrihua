import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

const featureCards = [
  {
    title: 'Fast Shipping',
    description: 'Next-day delivery in major cities with pickup support.',
    tone: 'from-[#d6e7ff] to-[#eef4ff]'
  },
  {
    title: 'Authentic Supply',
    description: 'Official channel sourcing and transparent batch traceability.',
    tone: 'from-[#ffe7d7] to-[#fff4ec]'
  },
  {
    title: 'Pro Recommendations',
    description: 'Build routines by skin type and daily scenarios.',
    tone: 'from-[#def6ea] to-[#f1fbf6]'
  },
  {
    title: 'Member Benefits',
    description: 'Points, birthday perks, and early-access campaigns.',
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
            <h2 className="section-title mt-3">Top products this week</h2>
            <p className="section-subtitle mt-2">Ranked by visits, add-to-cart actions, and conversions over the last 7 days.</p>
          </div>
        </div>
        <ProductList />
      </section>
    </div>
  )
}

export default HomePage