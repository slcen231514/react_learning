import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useNavigate, useSearchParams } from 'react-router-dom'
  import './index.scss'

  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'

import { useEffect, useState } from 'react';
import { createArticleAPI, getArticleById, updateArticleAPI} from '@/apis/article';
import { useChannel } from '@/hooks/useChannel'
  
  const { Option } = Select
  
  const Publish = () => {
    const navigate = useNavigate()
    // 获取频道
    const {channelList } = useChannel()

    // 提交表单
    const onFinish = async (formValue) => {
      // 校验封面类型imageType是否和实际图片列表imageList数量相等
      if(imageList.length !== imageType) return message.warning('图片数量不匹配')
      const { title, content, channel_id } = formValue
      // 1.按照接口文档格式处理表单数据
      const reqData = {
        title,
        content,
        cover: {
          type: imageType,
          // 这里的url处理逻辑只是新增时的逻辑
          images: imageList.map(item => {
            if(item.response) {
              return item.response.data.url
            } else {
              return item.url
            }
          }) // 上传图片列表
        },
        channel_id
      }
      // 2.调用接口提交
      // 处理调用不同接口 新增 - 新增接口 编辑状态 - 编辑接口
      try {
        if (articleId) {
          // 编辑文章
          await updateArticleAPI({ ...reqData, id: articleId });
          message.success("编辑成功");
        } else {
          // 新增文章
          await createArticleAPI(reqData);
          message.success("发布成功");
        }
        navigate('/article')
      } catch (error) {
        message.error("操作失败，请稍后重试");
        console.error("API error:", error);
      }
    }

    // 上传回调
    const [imageList, setImageList] = useState([])
    const onChange = (value) => {
      setImageList(value.fileList)
    }

    // 切换图片封面类型
    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e) => {
      setImageType(e.target.value)
    }

    // 回填数据
    const [searchParams] = useSearchParams()
    const articleId = searchParams.get('id')
    // 获取实例
    const [form] = Form.useForm()
    useEffect(() => {
      // 1.通过id获取数据
      async function getArticleDetail() {
        const res = await getArticleById(articleId)
        const data = res.data
        const { cover } = data
        // form.setFieldsValue(res.data)
        // 无法回填封面图片？
        // 数据结构问题 set方法 -> { type: 3 }  res.data -> { cover: { type: 3}}

        form.setFieldsValue({
          ...data,
          type: cover.type
        })

        // 回填图片列表
        setImageType(cover.type)
        // 显示图片({url:url})
        setImageList(cover.images.map(url => {
          return { url }
        }))

      }
      // 只有有id的时候调用此函数回填
      if(articleId) getArticleDetail()
      // 2.调用实例方法 完成回填
    }, [articleId, form])

    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章`}
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 0 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {/*value属性用户选中后会自动收集起来作为接口的提交字段*/}
                {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)} 
              </Select>
            </Form.Item>
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange={onTypeChange}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {/*
                listType: 决定选择文件筐外观样式
                shwoUploadList: 控制显示上传列表
              */}
              {imageType > 0 && 
                <Upload
                  listType="picture-card"
                  showUploadList
                  action={'http://geek.itheima.net/v1_0/upload'}
                  name='image'
                  onChange={onChange}
                  maxCount={imageType}
                  fileList={imageList}
                >
                  <div style={{ marginTop: 8 }}>
                    <PlusOutlined />
                  </div>
                </Upload>}
              
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                {/*富文本编辑*/}
                <ReactQuill
                  className="publish-quill"
                  theme="snow"
                  placeholder="请输入文章内容"
                />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  {`${articleId ? "编辑" : "发布"}文章`}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish