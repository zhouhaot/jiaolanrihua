import { useState } from 'react'
import { Form, Input, Select, Radio, Button, Space, Typography, Card, Divider } from 'tdesign-react'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart()
  const [form] = Form.useForm()
  const [paymentMethod, setPaymentMethod] = useState('alipay')

  const onFinish = (values: any) => {
    console.log('提交订单:', values)
    // TODO: 处理订单提交
    alert('订单提交成功！')
    clearCart()
    // 跳转到订单确认页面
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography.Title level="h2" className="mb-8">结算</Typography.Title>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="收货信息" className="mb-6">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.FormItem label="收货人姓名" name="name" rules={[{ required: true }]}>
                  <Input placeholder="请输入收货人姓名" />
                </Form.FormItem>
                <Form.FormItem label="联系电话" name="phone" rules={[{ required: true }]}>
                  <Input placeholder="请输入联系电话" />
                </Form.FormItem>
              </div>
              <Form.FormItem label="所在地区" name="region" rules={[{ required: true }]}>
                <Select
                  placeholder="请选择省市区"
                  options={[
                    { label: '北京市', value: 'beijing' },
                    { label: '上海市', value: 'shanghai' },
                    { label: '广州市', value: 'guangzhou' },
                    { label: '深圳市', value: 'shenzhen' },
                    { label: '杭州市', value: 'hangzhou' },
                  ]}
                />
              </Form.FormItem>
              <Form.FormItem label="详细地址" name="address" rules={[{ required: true }]}>
                <Input.Textarea placeholder="请输入详细地址，如街道、小区、门牌号等" />
              </Form.FormItem>
              <Form.FormItem label="邮政编码" name="zipCode">
                <Input placeholder="请输入邮政编码" />
              </Form.FormItem>
            </Form>
          </Card>

          <Card title="支付方式" className="mb-6">
            <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
              <Space direction="vertical" className="w-full">
                <Radio value="alipay">
                  <div className="flex items-center">
                    <img src="https://img.alicdn.com/tfs/TB1w2.LxHY1gK0jSZTEXXXDQVXa-200-200.png" alt="支付宝" className="w-8 h-8 mr-2" />
                    <Typography.Text strong>支付宝</Typography.Text>
                  </div>
                </Radio>
                <Radio value="wechat">
                  <div className="flex items-center">
                    <img src="https://res.wx.qq.com/op_res/9rSix1dhHfK4rR049JL0PHJ7TpOvkuZ3mE0zHyOvkTS0fSqQpwcO6YI4t8E8xsVq" alt="微信支付" className="w-8 h-8 mr-2" />
                    <Typography.Text strong>微信支付</Typography.Text>
                  </div>
                </Radio>
                <Radio value="bank">
                  <div className="flex items-center">
                    <img src="https://static.tdesign.tencent.com/starter/assets/bank-card.svg" alt="银行卡" className="w-8 h-8 mr-2" />
                    <Typography.Text strong>银行卡支付</Typography.Text>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </Card>

          <Card title="订单备注" className="mb-6">
            <Input.Textarea
              placeholder="如有特殊要求，请在此备注（例如：配送时间、商品包装等）"
              maxlength={200}
              showLimitNumber
            />
          </Card>
        </div>

        <div>
          <Card title="订单摘要">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <Typography.Text className="block">{item.name}</Typography.Text>
                    <Typography.Text type="secondary" className="text-sm">
                      ¥{item.price} × {item.quantity}
                    </Typography.Text>
                  </div>
                  <Typography.Text strong>
                    ¥{(item.price * item.quantity).toFixed(2)}
                  </Typography.Text>
                </div>
              ))}
              <Divider />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography.Text>商品总价:</Typography.Text>
                  <Typography.Text>¥{totalPrice.toFixed(2)}</Typography.Text>
                </div>
                <div className="flex justify-between">
                  <Typography.Text>运费:</Typography.Text>
                  <Typography.Text>¥0.00</Typography.Text>
                </div>
                <div className="flex justify-between">
                  <Typography.Text>优惠券:</Typography.Text>
                  <Typography.Text type="success">-¥0.00</Typography.Text>
                </div>
                <Divider />
                <div className="flex justify-between text-lg">
                  <Typography.Text strong>应付总额:</Typography.Text>
                  <Typography.Title level="h3" className="text-purple-700">
                    ¥{totalPrice.toFixed(2)}
                  </Typography.Title>
                </div>
              </div>
              <Button block theme="primary" size="large" onClick={() => form.submit()}>
                提交订单
              </Button>
              <Button block variant="outline" size="large" className="mt-2">
                <Link to="/cart">返回修改</Link>
              </Button>
              <Typography.Text type="secondary" className="block mt-4 text-sm">
                点击提交订单即表示您已同意
                <Link to="/terms" className="text-purple-600 ml-1">《用户协议》</Link>
                和
                <Link to="/privacy" className="text-purple-600 ml-1">《隐私政策》</Link>
              </Typography.Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage