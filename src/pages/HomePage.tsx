import { Typography, Space, Card, Row, Col } from 'tdesign-react'
import { StarIcon, MapIcon, LockOnIcon, GiftIcon } from 'tdesign-icons-react'
import ProductList from '../components/ProductList'
import Hero from '../components/Hero'

const HomePage = () => {
  const features = [
    {
      icon: <MapIcon size="24px" />,
      title: '快速配送',
      description: '全国大部分地区次日达，支持门店自提'
    },
    {
      icon: <LockOnIcon size="24px" />,
      title: '正品保证',
      description: '所有商品官方授权，假一赔十'
    },
    {
      icon: <StarIcon size="24px" />,
      title: '专业推荐',
      description: '专业美容顾问在线解答，个性化推荐'
    },
    {
      icon: <GiftIcon size="24px" />,
      title: '会员专享',
      description: '会员专属折扣、生日礼遇及积分兑换'
    }
  ]

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Row gutter={16}>
          {features.map((feature, index) => (
            <Col key={index} xs={12} sm={6} lg={3}>
              <Card className="text-center h-full" bordered>
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <Typography.Title level="h4" className="mb-2">{feature.title}</Typography.Title>
                <Typography.Text className="text-gray-600">{feature.description}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Typography.Title level="h2" className="text-center mb-8">热门产品</Typography.Title>
        <ProductList />
      </div>
      <div className="bg-gray-50 py-12 mt-12">
        <div className="container mx-auto px-4">
          <Typography.Title level="h2" className="text-center mb-8">为什么选择娇兰日化？</Typography.Title>
          <Row gutter={32}>
            <Col xs={12} md={6}>
              <div className="mb-8">
                <Typography.Title level="h3" className="mb-4">品质保证</Typography.Title>
                <Typography.Text className="text-gray-600">
                  我们与全球知名品牌建立直接合作关系，确保每一件商品都是正品。所有商品均通过严格的质量检测，为您提供安全可靠的购物体验。
                </Typography.Text>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-8">
                <Typography.Title level="h3" className="mb-4">专业服务</Typography.Title>
                <Typography.Text className="text-gray-600">
                  拥有专业的美容顾问团队，为您提供个性化的护肤、彩妆建议。无论是线上咨询还是到店体验，我们都能满足您的需求。
                </Typography.Text>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-8">
                <Typography.Title level="h3" className="mb-4">优惠价格</Typography.Title>
                <Typography.Text className="text-gray-600">
                  通过直采模式减少中间环节，为消费者带来更优惠的价格。定期推出会员专享折扣、满减优惠和限量特价商品。
                </Typography.Text>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="mb-8">
                <Typography.Title level="h3" className="mb-4">便捷购物</Typography.Title>
                <Typography.Text className="text-gray-600">
                  支持多种支付方式，提供快速的物流配送服务。全国超过100个城市支持次日达，部分商品支持门店自提，满足您的不同需求。
                </Typography.Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default HomePage