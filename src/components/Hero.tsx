import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="container-app pb-10 pt-10 md:pb-14 md:pt-14">
      <div className="bento">
        <div className="bento-item fade-in-up col-span-12 overflow-hidden bg-[linear-gradient(135deg,#0f6fff_0%,#5ca6ff_55%,#b8d5ff_100%)] text-white md:col-span-8 md:p-10">
          <p className="pill mb-4 bg-white/20 text-white">2026 Spring Edit</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            让“高颜值 + 好功效”
            <br className="hidden md:block" />
            同时出现在你的每日护理里
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-blue-50 md:text-base">
            精选护肤、彩妆、香氛与个护单品，用更现代的购物体验，帮你更快找到真正适合自己的产品组合。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/#hot" className="btn-modern rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900">
              立即选购
            </Link>
            <Link to="/#story" className="btn-modern rounded-xl border border-white/50 bg-transparent px-5 py-3 text-sm font-semibold text-white">
              查看品牌故事
            </Link>
          </div>
        </div>

        <div className="bento-item fade-in-up col-span-12 bg-white md:col-span-4" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-slate-500">本月热门趋势</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Clean Glow</p>
          <p className="mt-3 text-sm text-slate-600">轻底妆、低负担护理、可持续包装，成为今年消费主线。</p>
          <div className="mt-5 rounded-2xl bg-[linear-gradient(120deg,#ffe4d5,#fff5ef)] p-4">
            <p className="text-xs text-slate-500">用户加购提升</p>
            <p className="mt-1 text-2xl font-bold text-[#c05a2e]">+32%</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero