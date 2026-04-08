import { Typography, Space, Link, Divider } from 'tdesign-react'
import { LogoWechatStrokeIcon, LogoQqIcon, LogoTwitterIcon } from 'tdesign-icons-react'

const Footer = () => {
  const footerLinks = [
    { title: '客户服务', links: ['帮助中心', '联系我们', '退换货政策', '配送信息'] },
    { title: '关于我们', links: ['公司简介', '品牌故事', '招贤纳士', '门店查询'] },
    { title: '购物指南', links: ['新手指南', '会员制度', '优惠券使用', '常见问题'] },
    { title: '商务合作', links: ['供应商入驻', '广告合作', '企业采购', '渠道合作'] },
  ]

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <Typography.Title level="h3" className="text-white mb-4">娇兰日化</Typography.Title>
            <Typography.Text className="text-gray-300">
              专注日化用品零售，为您提供优质的护肤、彩妆、香水及个人护理产品。
            </Typography.Text>
            <Space className="mt-4">
              <Link href="#" theme="primary" hover="color">
                <LogoWechatStrokeIcon size="24px" />
              </Link>
              <Link href="#" theme="primary" hover="color">
                <LogoQqIcon size="24px" />
              </Link>
              <Link href="#" theme="primary" hover="color">
                <LogoTwitterIcon size="24px" />
              </Link>
            </Space>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <Typography.Title level="h4" className="text-white mb-4">{section.title}</Typography.Title>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" theme="primary" hover="color" className="text-gray-300 hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Divider className="my-8 border-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Typography.Text className="text-gray-400">
            © 2025 娇兰日化 版权所有
          </Typography.Text>
          <Typography.Text className="text-gray-400 mt-2 md:mt-0">
            备案号：沪ICP备12345678号
          </Typography.Text>
        </div>
      </div>
    </footer>
  )
}

export default Footer