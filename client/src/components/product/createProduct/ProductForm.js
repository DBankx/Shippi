import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Row,
  Col,
  Button,
  Divider,
  Radio
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { getNames } from 'country-list';
import {
  DropboxOutlined,
  DollarOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { createListing } from '../../../actions/product';
import { Link, Redirect } from 'react-router-dom';
import Preview from './Preview';
import View from './View';

const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({
  createListing,
  product: { loading, item },
  auth: { user }
}) => {
  const [fileList, setFileList] = useState([]);

  const tailLayout = {
    wrapperCol: {
      span: 13,
      offset: 0
    },
    labelCol: {
      span: 6
    }
  };

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    brandName: '',
    color: '',
    size: '',
    features: '',
    modelNumber: '',
    description: '',
    price: 0,
    quantity: 1,
    nameOfService: '',
    weight: 0,
    height: 0,
    depth: 0,
    width: 0,
    shippingPrice: '',
    estimatedDevlivery: ''
  });

  function handleFormData({ target }) {
    const { name, value } = target;

    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');
  const [format, setFormat] = useState('');
  const [domesticShipping, setDomestic] = useState('');
  const [internationalShipping, setInternational] = useState('');
  const [itemLocation, setItemLocation] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [returns, setReutrns] = useState('');

  function handleDate(date, dateString) {
    setReleaseDate(dateString);
  }

  const {
    title,
    subtitle,
    brandName,
    color,
    size,
    features,
    modelNumber,
    description,
    price,
    quantity,
    nameOfService,
    weight,
    height,
    depth,
    width,
    shippingPrice,
    estimatedDelivery
  } = formData;

  const countryNames = getNames();

  const onChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // preview the image on a new web page
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleSubmit = () => {
    const itemData = new FormData();
    const keys = Object.keys(formData);
    keys.map((key) => {
      itemData.append(key, formData[key]);
      return true;
    });
    itemData.append('condition', condition);
    itemData.append('category', category);
    itemData.append('countryOrigin', countryOrigin);
    itemData.append('domesticShipping', domesticShipping);
    itemData.append('internationalShipping', internationalShipping);
    itemData.append('itemLocation', itemLocation);
    itemData.append('returns', returns);
    itemData.append('format', format);
    itemData.append('releaseDate', releaseDate);
    fileList.forEach((file) => {
      itemData.append('productImages', file.originFileObj);
    });
    createListing(itemData);
  };

  //   data that is going to be showed in the view
  const viewData = {
    condition,
    category,
    countryOrigin,
    domesticShipping,
    internationalShipping,
    itemLocation,
    returns,
    format,
    releaseDate,
    fileList,
    title,
    subtitle,
    brandName,
    color,
    size,
    features,
    modelNumber,
    description,
    price,
    quantity,
    nameOfService,
    weight,
    height,
    depth,
    width,
    shippingPrice,
    user,
    estimatedDelivery
  };

  //   state handling for preview window
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const togglePreviewWindow = () => setIsPreviewOpen(!isPreviewOpen);
  const closePreviewWindow = () => setIsPreviewOpen(false);

  useEffect(() =>
    window.addEventListener('beforeunload', () => closePreviewWindow())
  );

  // redirect if product has been succesfully added
  if (loading && item !== null) {
    return <Redirect to={`/item/${item._id}`} />;
  }

  return (
    <div className='container sell'>
      <Row align='middle' justify='center' className=''>
        <Col xl={18} xs={24} lg={18} md={23} sm={24}>
          <h1>Sell your products</h1>

          <Form
            initialValues={{
              remember: true
            }}
            onFinish={handleSubmit}
            {...tailLayout}
            encType='multipart/form-data'
          >
            <div className='product-form'>
              <Row align='middle' justify='space-between'>
                <Col>
                  <h2>{<FileTextOutlined />} Listing Details</h2>
                </Col>
                <Col>
                  <Link to='/'>Home</Link>
                </Col>
              </Row>

              <Form.Item
                name='title'
                label='Title'
                rules={[
                  { required: true, message: 'Title of item is required' },
                  {
                    max: 80,
                    message: 'Title cannot be longer than 80 characters'
                  }
                ]}
                hasFeedback
              >
                <Input
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleFormData}
                  size='large'
                />
              </Form.Item>

              <Form.Item
                name='subtitle'
                label='Subtitle'
                rules={[
                  {
                    max: 55,
                    message: 'Subtitle cannot be longer than 55 characters'
                  }
                ]}
                hasFeedback
              >
                <Input
                  type='text'
                  name='subtitle'
                  value={subtitle}
                  onChange={handleFormData}
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='category'
                label='Category'
                rules={[
                  {
                    required: true,
                    message: 'Category of your item is required'
                  }
                ]}
                hasFeedback
              >
                <Select
                  name='category'
                  value={category}
                  onChange={(value) => setCategory(value)}
                  size='large'
                >
                  <option value='Arts & Craft'>Arts and Craft</option>
                  <option value='Automotive'>Automotive</option>
                  <option value='Technology'>Technology</option>
                  <option value='Books'>Books</option>
                  <option value='Electronics'>Electronics</option>
                  <option value='Fashion'>Fashion</option>
                  <option value='Home & Kitchen'>Home and Kitchen</option>
                  <option value='Toys & Games'>Toys and Games</option>
                  <option value='Video Games'>Video Games</option>
                  <option value='Health'>Health</option>
                  <option value='Tools'>Tools</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='condition'
                label='Condition'
                rules={[
                  {
                    required: true,
                    message: 'condition of your item is required'
                  }
                ]}
                hasFeedback
              >
                <Select
                  name='condition'
                  value={condition}
                  onChange={(value) => setCondition(value)}
                  size='large'
                >
                  <Option value='New with box'>New with box</Option>
                  <Option value='New without box'>New without box</Option>
                  <Option value='New with defects'>New with defects</Option>
                  <Option value='Used'>Used</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='productImages'
                label={
                  <span>
                    <span style={{ color: 'red' }}>*</span> Photos(
                    {fileList.length})
                  </span>
                }
                hasFeedback
              >
                <ImgCrop aspect={3 / 2} rotate>
                  <Upload
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    listType='picture-card'
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileList.length < 6 && '+ Upload'}
                  </Upload>
                </ImgCrop>
                <small>
                  Add up to 5 photos. We only allow image formats of *jpg and
                  *jpeg, we dont allow photos with extra borders, text or atwork
                </small>
              </Form.Item>
              <Form.Item name='item-spec' label='Item specifics'>
                <div className='item-spec'>
                  <h3>Required</h3>
                  <p>Buyers need these item specifics about your item</p>
                  <Form.Item
                    name='brandName'
                    label='Brand'
                    rules={[
                      { required: true, message: 'Brand name is required' }
                    ]}
                    hasFeedback
                  >
                    <Input
                      type='text'
                      value={brandName}
                      onChange={handleFormData}
                      name='brandName'
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item
                    name='color'
                    label='Color'
                    rules={[
                      { required: true, message: 'Color of item is required' }
                    ]}
                    hasFeedback
                  >
                    <Input
                      type='text'
                      value={color}
                      onChange={handleFormData}
                      name='color'
                      size='large'
                    />
                  </Form.Item>
                  <Divider />
                  <h3>Recommended</h3>
                  <p>*Buyers frequently search for these items</p>
                  <Form.Item name='size' label='Size' hasFeedback>
                    <Input
                      type='text'
                      name='size'
                      value={size}
                      onChange={handleFormData}
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item
                    name='modelNumber'
                    label='Model number'
                    hasFeedback
                  >
                    <Input
                      type='text'
                      name='modelNumber'
                      value={modelNumber}
                      onChange={handleFormData}
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item
                    name='countryOrigin'
                    label='Country Origin'
                    hasFeedback
                  >
                    <Select
                      name='countryOrigin'
                      value={countryOrigin}
                      onChange={(value) => setCountryOrigin(value)}
                      size='large'
                    >
                      {countryNames.map((country, index) => (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='releaseDate'
                    label='Release Date'
                    hasFeedback
                  >
                    <DatePicker
                      name='releaseDate'
                      value={releaseDate}
                      onChange={handleDate}
                      size='large'
                    />
                  </Form.Item>
                  <Form.Item name='features' label='Features' hasFeedback>
                    <TextArea
                      type='text'
                      name='features'
                      row={4}
                      value={features}
                      onChange={handleFormData}
                    />
                    <small>
                      Please after each feature leave a comma. eg. black rim, 4
                      pockets
                    </small>
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item
                name='description'
                label='Item description'
                rules={[
                  {
                    required: true,
                    message: 'A description of your item is required'
                  }
                ]}
                hasFeedback
              >
                <TextArea
                  type='text'
                  name='description'
                  rows={10}
                  value={description}
                  onChange={handleFormData}
                />
              </Form.Item>
            </div>
            <div className='price'>
              <h2>{<DollarOutlined />} Selling Details</h2>
              <Form.Item
                name='format'
                label='Format'
                rules={[
                  { required: true, message: 'Price format is required' }
                ]}
                hasFeedback
              >
                <Select
                  name='format'
                  value={format}
                  onChange={(value) => setFormat(value)}
                  size='large'
                >
                  <Option value='Fixed price'>Fixed price</Option>
                  <Option value='Negotiatable'>Negotiatable</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='price'
                label='Price'
                rules={[{ required: true, message: 'Item price is required' }]}
                hasFeedback
              >
                <Input
                  style={{ width: '50%' }}
                  type='number'
                  name='price'
                  prefix='$'
                  value={price}
                  onChange={handleFormData}
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='quantity'
                label='Quantity'
                rules={[{ required: true, message: 'Quantity is required' }]}
                hasFeedback
              >
                <Input
                  type='number'
                  name='quantity'
                  value={quantity}
                  onChange={handleFormData}
                  size='large'
                />
              </Form.Item>
              <Form.Item name='returns' label='Return options' hasFeedback>
                <Radio.Group
                  name='returns'
                  value={returns}
                  onChange={(e) => setReutrns(e.target.value)}
                  size='large'
                >
                  <Radio value={true}>Allow Returns</Radio>
                  <Radio value={false}>Returns not allowed</Radio>
                </Radio.Group>
                <small>
                  Returns will be accepted by default, please choose
                  accordingly.
                </small>
              </Form.Item>
            </div>
            <div className='shipping'>
              <h2>{<DropboxOutlined />} Shipping details</h2>
              <Form.Item
                name='domesticShipping'
                label='Domestic Shipping'
                hasFeedback
              >
                <Select
                  name='domesticShipping'
                  value={domesticShipping}
                  onChange={(value) => setDomestic(value)}
                  size='large'
                >
                  <Option value={true}>Allowed</Option>
                  <Option value={false}>Not Allowed</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name='internationalShipping'
                label='International Shipping'
                hasFeedback
              >
                <Select
                  name='internationalShipping'
                  value={internationalShipping}
                  onChange={(value) => setInternational(value)}
                  size='large'
                >
                  <Option value={true}>Allowed</Option>
                  <Option value={false}>Not Allowed</Option>
                </Select>
                <small>
                  International Shipping is not allowed by default, please
                  choose accordingly
                </small>
              </Form.Item>
              <Form.Item name='shipping' label='Shipping price'>
                <Row gutter={8}>
                  <Col span={15}>
                    <label htmlFor='nameOfService'>Shipping service</label>
                    <Input
                      type='text'
                      name='nameOfService'
                      value={nameOfService}
                      onChange={handleFormData}
                      size='large'
                    />
                  </Col>
                  <Col span={8}>
                    <label htmlFor='shippingPrice'>
                      <span style={{ color: 'red' }}>*</span> Cost
                    </label>
                    <Input
                      type='number'
                      prefix='$'
                      name='shippingPrice'
                      value={shippingPrice}
                      onChange={handleFormData}
                      size='large'
                    />
                  </Col>
                </Row>
                <Radio.Group
                  name='shippingPrice'
                  value={shippingPrice}
                  onChange={handleFormData}
                  size='large'
                >
                  <Radio name='shippingPrice' value={0.0}>
                    Free shipping
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name='estimatedDelivery'
                label='Estimated Devlivery'
                rules={[
                  {
                    required: true,
                    message: 'Estimated delivery date is required'
                  }
                ]}
              >
                <Input
                  size='large'
                  type='date'
                  name='estimatedDelivery'
                  value={estimatedDelivery}
                  onChange={handleFormData}
                />
              </Form.Item>
              <Form.Item label='Shipping specifics' hasFeedback>
                <Input.Group size='large'>
                  <Row gutter={8}>
                    <Col span={6}>
                      <label htmlFor='weight'>Weight</label>
                      <Input
                        value={weight}
                        onChange={handleFormData}
                        prefix='lbs'
                        name='weight'
                        type='number'
                      />
                    </Col>
                    <Col span={6}>
                      <label htmlFor='height'>Height</label>
                      <Input
                        prefix='m'
                        value={height}
                        onChange={handleFormData}
                        name='height'
                        type='number'
                      />
                    </Col>
                    <Col span={6}>
                      <label htmlFor='width'>Width</label>
                      <Input
                        value={width}
                        onChange={handleFormData}
                        prefix='cm'
                        name='width'
                        type='number'
                      />
                    </Col>
                    <Col span={6}>
                      <label htmlFor='depth'>Depth</label>
                      <Input
                        value={depth}
                        onChange={handleFormData}
                        prefix='cm'
                        name='depth'
                        type='number'
                      />
                    </Col>
                  </Row>
                </Input.Group>
              </Form.Item>
              <Form.Item name='itemLocation' hasFeedback label='Item location'>
                <Select
                  name='itemLocation'
                  value={itemLocation}
                  onChange={(value) => setItemLocation(value)}
                  size='large'
                >
                  {countryNames.map((country, index) => (
                    <Option key={index} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className='fees'>
              <Row>
                <Col span={7}>
                  <h1>Fees</h1>
                </Col>
                <Col span={17}>
                  <h1>$0.00</h1>
                </Col>
              </Row>
            </div>
            <div className='triggers'>
              <small style={{ marginTop: '1em' }}>
                If you sell your item, you will charged a final fee
              </small>
              <small style={{ marginBottom: '1em' }}>
                By selecting List item, you are agreeing to{' '}
                <a href='/!'>Accepting shippi user aggreement</a>,{' '}
                <a href='/!'>Accepting shippi marketing terms of services</a>{' '}
                and reading the shippi <a href='/!'>privacy terms of service</a>{' '}
                and assume full responsibility for the item offered and the
                content of your listing.
              </small>
              <Row align='middle'>
                <Col>
                  <Form.Item>
                    <Button
                      htmlType='submit'
                      size='large'
                      type='primary'
                      style={{
                        padding: '0 40px',
                        marginRight: '1em',
                        height: '50px',
                        fontSize: '1.25rem'
                      }}
                      loading={loading ? true : false}
                    >
                      List item
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button
                      size='large'
                      style={{
                        padding: '0 40px',
                        marginRight: '1em',
                        height: '50px',
                        fontSize: '1.25rem'
                      }}
                      type='button'
                      onClick={togglePreviewWindow}
                    >
                      Preview
                    </Button>
                  </Form.Item>
                </Col>
                <Col className='cancel'>
                  <Form.Item>
                    <Button
                      size='large'
                      type='primary'
                      style={{
                        padding: '0 30px',
                        marginRight: '1em',
                        height: '50px'
                      }}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Form>
        </Col>
      </Row>
      {/* checks if the popupWindow is open */}
      {isPreviewOpen && (
        <Preview closeWindow={closePreviewWindow}>
          <View data={viewData} />
        </Preview>
      )}
    </div>
  );
};

const mapState = ({ product, auth }) => ({
  product,
  auth
});

export default connect(mapState, { createListing })(ProductForm);
