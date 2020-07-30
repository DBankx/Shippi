import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  Divider,
  Tooltip
} from 'antd';
import { addAddress } from '../../../../actions/profile';
import { connect } from 'react-redux';

import { PlusOutlined } from '@ant-design/icons';

const AddressModal = ({ addAddress }) => {
  const [visible, setVisible] = useState(false);

  function ShowModal() {
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
  }

  const [formData, setFormData] = useState({
    addressLine: '',
    additionalInfo: '',
    city: '',
    postalCode: '',
    state: '',
    country: ''
  });

  const [type, setType] = useState('');

  function handleType(value) {
    setType(value);
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const {
    city,
    country,
    addressLine,
    postalCode,
    state,
    additionalInfo
  } = formData;

  const addressData = {
    type,
    city,
    postalCode,
    state,
    additionalInfo,
    addressLine,
    country
  };

  return (
    <div>
      <Tooltip title='Add address' placement='top'>
        <Button
          shape='circle'
          type='primary'
          onClick={ShowModal}
          icon={<PlusOutlined />}
        ></Button>
      </Tooltip>
      <Modal
        title='Add an address'
        visible={visible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          onFinish={() => {
            addAddress(addressData);
            closeModal();
            setFormData('');
            setType('');
          }}
          initialValues={{
            remember: true
          }}
          id='address-form'
        >
          <Form.Item
            rules={[{ required: true, message: 'Please add an address type' }]}
            name='type'
            hasFeedback
          >
            <Select
              placeholder='type of address'
              name='type'
              value={type}
              onChange={handleType}
            >
              <option value='Home Address'>Home Address</option>
              <option value='Billing Address'>Billing Address</option>
              <option value='Company Address'>Company Address</option>
              <option value='Shipping Address'>Shipping Address</option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please your address' }]}
            hasFeedback
            name='addressLine'
          >
            <Input
              type='text'
              placeholder='Address line'
              name='addressLine'
              value={addressLine}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please add a city' }]}
            hasFeedback
            name='city'
          >
            <Input
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please add a post code' }]}
            hasFeedback
            name='postalCode'
          >
            <Input
              type='text'
              placeholder='Postcode'
              name='postalCode'
              value={postalCode}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please add a state' }]}
            hasFeedback
            name='state'
          >
            <Input
              type='text'
              placeholder='State'
              name='state'
              value={state}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please add a country' }]}
            hasFeedback
            name='country'
          >
            <Input
              type='text'
              placeholder='Country'
              name='country'
              value={country}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              row={4}
              type='text'
              placeholder='Additional information'
              name='additionalInfo'
              value={additionalInfo}
              onChange={handleChange}
            />
          </Form.Item>
          <Divider style={{ width: '100%' }} />
          <Row align='middle' justify='end'>
            <Col xl={5} lg={6} ms={6} xs={8}>
              <Form.Item>
                <Button
                  type='primary'
                  style={{
                    backgroundColor: '#fff',
                    borderColor: '#ddd',
                    color: '#fff'
                  }}
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} ms={6} xs={8}>
              <Form.Item>
                <Button
                  htmlType='submit'
                  style={{
                    backgroundColor: '#89c9b8',
                    color: '#fff',
                    borderColor: '#89c9b8'
                  }}
                  className='btn'
                  type='primary'
                >
                  Add address
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default connect(null, { addAddress })(AddressModal);
