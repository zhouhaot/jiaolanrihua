import { Button, Space, Typography } from 'tdesign-react'
import { ArrowRightIcon } from 'tdesign-icons-react'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <Typography.Title level="h1" className="text-4xl md:text-5xl font-bold mb-4">
            发现你的美丽密码
          </Typography.Title>
          <Typography.Text className="text-xl mb-8 opacity-90">
            娇兰日化为您带来全球精选的护肤、彩妆及个人护理产品。专业品质，亲民价格，让美丽触手可及。
          </Typography.Text>
          <Space>
            <Button size="large" theme="default" icon={<ArrowRightIcon />}>
              立即选购
            </Button>
            <Button size="large" variant="outline" theme="default">
              了解会员
            </Button>
          </Space>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/10 to-transparent hidden lg:block"></div>
    </div>
  )
}

export default Hero