import React, { useState } from 'react';
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

const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ createListing }) => {
  const [fileList, setFileList] = useState([]);

  const mainFile = [];

  const tailLayout = {
    wrapperCol: {
      span: 10,
      offset: 0
    },
    labelCol: {
      span: 6
    }
  };

  const countryNames = getNames();

  // onchange for image
  const onchange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  //   get the list of images with only the names
  fileList.forEach((file) => mainFile.push(file.name));

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
    shippingPrice: ''
  });

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
    shippingPrice
  } = formData;

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

  //   const itemData = {
  //     title,
  //     subtitle,
  //     brandName,
  //     color,
  //     size,
  //     features,
  //     modelNumber,
  //     releaseDate,
  //     description,
  //     price,
  //     quantity,
  //     nameOfService,
  //     weight,
  //     height,
  //     depth,
  //     width,
  //     shippingPrice,
  //     returns,
  //     productImages: mainFile,
  //     category,
  //     condition,
  //     countryOrigin,
  //     format,
  //     domesticShipping,
  //     internationalShipping,
  //     itemLocation
  //   };

  const itemData = new FormData();
  itemData.append('title', title);
  itemData.append('subtitle', subtitle);
  itemData.append('brandName', brandName);
  itemData.append('condition', condition);
  itemData.append('color', color);
  itemData.append('size', size);
  itemData.append('features', features);
  itemData.append('modelNumber', modelNumber);
  itemData.append('releaseDate', releaseDate);
  itemData.append('description', description);
  itemData.append('price', price);
  itemData.append('quantity', quantity);
  itemData.append('nameOfService', nameOfService);
  itemData.append('weight', weight);
  itemData.append('height', height);
  itemData.append('depth', depth);
  itemData.append('width', width);
  itemData.append('shippingPrice', shippingPrice);
  itemData.append('returns', returns);
  itemData.append('productImages', fileList);
  itemData.append('category', category);
  itemData.append('countryOrigin', countryOrigin);
  itemData.append('format', format);
  itemData.append('domesticShipping', domesticShipping);
  itemData.append('internationalShipping', internationalShipping);
  itemData.append('itemLocation', itemLocation);

  return (
    <div className='container sell'>
      <h1>Create your listing</h1>

      <Form
        initialValues={{
          remember: true
        }}
        onFinish={() => createListing(itemData)}
        {...tailLayout}
      >
        <div className='product-form'>
          <h2>{<FileTextOutlined />} Listing Details</h2>

          <Form.Item
            name='title'
            label='Title'
            rules={[
              { required: true, message: 'Title of item is required' },
              { max: 80, message: 'Title cannot be longer than 80 characters' }
            ]}
          >
            <Input
              type='text'
              name='title'
              value={title}
              onChange={handleFormData}
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
          >
            <Input
              type='text'
              name='subtitle'
              value={subtitle}
              onChange={handleFormData}
            />
          </Form.Item>
          <Form.Item
            name='category'
            label='Category'
            rules={[
              { required: true, message: 'Category of your item is required' }
            ]}
          >
            <Select
              name='category'
              value={category}
              onChange={(value) => setCategory(value)}
            >
              <option value='Arts & Craft'>Arts & Craft</option>
              <option value='Automotive'>Automotive</option>
              <option value='Technology'>Technology</option>
              <option value='Books'>Books</option>
              <option value='Electronics'>Electronics</option>
              <option value='Fashion'>Fashion</option>
              <option value='Home & Kitchen'>Home & Kitchen</option>
              <option value='Toys & Games'>Toys & Games</option>
              <option value='Video Games'>Video Games</option>
              <option value='Health'>Health</option>
              <option value='Tools'>Tools</option>
            </Select>
          </Form.Item>
          <Form.Item
            name='condition'
            label='Condition'
            rules={[
              { required: true, message: 'condition of your item is required' }
            ]}
          >
            <Select
              name='condition'
              value={condition}
              onChange={(value) => setCondition(value)}
            >
              <Option value='New with box'>New with box</Option>
              <Option value='New without box'>New without box</Option>
              <Option value='New with defects'>New with defects</Option>
              <Option value='Used'>Used</Option>
            </Select>
          </Form.Item>
          <Form.Item name='productImages' label={`Photos(${fileList.length})`}>
            <ImgCrop rotate>
              <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture-card'
                fileList={fileList}
                onChange={onchange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item label='Item specifics'>
            <div className='item-spec'>
              <h3>Required</h3>
              <p>Buyers need these item specifics about your item</p>
              <Form.Item
                name='brandName'
                label='Brand'
                rules={[{ required: true, message: 'Brand name is required' }]}
              >
                <Input
                  type='text'
                  value={brandName}
                  onChange={handleFormData}
                  name='brandName'
                />
              </Form.Item>
              <Form.Item
                name='color'
                label='Color'
                rules={[
                  { required: true, message: 'Color of item is required' }
                ]}
              >
                <Input
                  type='text'
                  value={color}
                  onChange={handleFormData}
                  name='color'
                />
              </Form.Item>
              <Divider />
              <h3>Recommended</h3>
              <p>*Buyers frequently search for these items</p>
              <Form.Item name='size' label='Size'>
                <Input
                  type='text'
                  name='size'
                  value={size}
                  onChange={handleFormData}
                />
              </Form.Item>
              <Form.Item name='modelNumber' label='Model number'>
                <Input
                  type='text'
                  name='modelNumber'
                  value={modelNumber}
                  onChange={handleFormData}
                />
              </Form.Item>
              <Form.Item name='countryOrigin' label='Country Origin'>
                <Select
                  name='countryOrigin'
                  value={countryOrigin}
                  onChange={(value) => setCountryOrigin(value)}
                >
                  {countryNames.map((country, index) => (
                    <Option value={country}>{country}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name='releaseDate' label='Release Date'>
                <DatePicker
                  name='releaseDate'
                  value={releaseDate}
                  onChange={handleDate}
                />
              </Form.Item>
              <Form.Item name='features' label='Features'>
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
            rules={[{ required: true, message: 'Price format is required' }]}
          >
            <Select
              name='format'
              value={format}
              onChange={(value) => setFormat(value)}
            >
              <Option value='Fixed Price'>Fixed Price</Option>
              <Option value='Negotiatable'>Negotiatable</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='price'
            label='Price'
            rules={[{ required: true, message: 'Item price is required' }]}
          >
            <Input
              style={{ width: '50%' }}
              type='number'
              name='price'
              prefix='$'
              value={price}
              onChange={handleFormData}
            />
          </Form.Item>
          <Form.Item
            name='quantity'
            label='Quantity'
            rules={[{ required: true, message: 'Quantity is required' }]}
          >
            <Input
              type='number'
              name='quantity'
              value={quantity}
              onChange={handleFormData}
            />
          </Form.Item>
          <Form.Item name='returns' label='Return options'>
            <Radio.Group
              name='returns'
              value={returns}
              onChange={(e) => setReutrns(e.target.value)}
            >
              <Radio value={true}>Allow Returns</Radio>
              <Radio value={false}>Returns not allowed</Radio>
            </Radio.Group>
            <small>
              Returns will be accepted by default, please choose accordingly.
            </small>
          </Form.Item>
        </div>
        <div className='shipping'>
          <h2>{<DropboxOutlined />} Shipping details</h2>
          <Form.Item name='domesticShipping' label='Domestic Shipping'>
            <Select
              name='domesticShipping'
              value={domesticShipping}
              onChange={(value) => setDomestic(value)}
            >
              <Option value={true}>Allowed</Option>
              <Option value={false}>Not Allowed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='internationalShipping'
            label='International Shipping'
          >
            <Select
              name='internationalShipping'
              value={internationalShipping}
              onChange={(value) => setInternational(value)}
            >
              <Option value={true}>Allowed</Option>
              <Option value={false}>Not Allowed</Option>
            </Select>
            <small>
              International Shipping is not allowed by default, please choose
              accordingly
            </small>
          </Form.Item>
          <Form.Item label='Shipping price'>
            <label htmlFor='nameOfService'>Service</label>
            <Input
              type='text'
              name='nameOfService'
              placeholder='Name of shipping service'
              value={nameOfService}
              onChange={handleFormData}
            />
            <label htmlFor='shippingPrice'>Cost</label>
            <Input
              type='number'
              prefix='$'
              name='shippingPrice'
              placeholder='Name of shipping service'
              value={shippingPrice}
              onChange={handleFormData}
            />
            <Radio.Group
              name='shippingPrice'
              value={shippingPrice}
              onChange={handleFormData}
            >
              <Radio name='shippingPrice' value={0}>
                Free shipping
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Shipping specifics'>
            <Input.Group size='large'>
              <Row gutter={8}>
                <Col span={5}>
                  <label htmlFor='weight'>Weight</label>
                  <Input
                    value={weight}
                    onChange={handleFormData}
                    prefix='lbs'
                    name='weight'
                    type='number'
                  />
                </Col>
                <Col span={5}>
                  <label htmlFor='height'>Height</label>
                  <Input
                    prefix='m'
                    value={height}
                    onChange={handleFormData}
                    name='height'
                    type='number'
                  />
                </Col>
                <Col span={5}>
                  <label htmlFor='width'>Width</label>
                  <Input
                    value={width}
                    onChange={handleFormData}
                    prefix='cm'
                    name='width'
                    type='number'
                  />
                </Col>
                <Col span={5}>
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
          <Form.Item label='Item location'>
            <Select
              name='itemLocation'
              name={itemLocation}
              onChange={(value) => setItemLocation(value)}
            >
              {countryNames.map((country, index) => (
                <Option value={country}>{country}</Option>
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
            <a href='/!'>Accepting shippi marketing terms of services</a> and
            reading the shippi <a href='/!'>privacy terms of service</a> and
            assume full responsibility for the item offered and the content of
            your listing.
          </small>
          <Form.Item>
            <Button
              htmlType='submit'
              size='large'
              type='primary'
              style={{
                padding: '0 30px',
                marginRight: '1em',
                height: '50px',
                fontSize: '1.25rem'
              }}
            >
              List item
            </Button>
            <Button
              size='large'
              style={{
                padding: '0 30px',
                marginRight: '1em',
                height: '50px',
                fontSize: '1.25rem'
              }}
            >
              Preview
            </Button>
            <Button
              size='large'
              type='link'
              style={{ padding: '0 10px', marginRight: '1em' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default connect(null, { createListing })(ProductForm);
