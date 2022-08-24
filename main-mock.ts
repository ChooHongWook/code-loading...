/* eslint-disable camelcase */
import { InvoiceModel } from '../../models';

interface SelectOrderType extends InvoiceModel {
  update: (req: InvoiceModel) => void;
  get: () => SelectOrderType;
  reset: () => void;
}
export const selectedOrder: SelectOrderType = {
  idx: 5,
  customer_manager_idx: 1,
  invoice_no: 'E220124AU0010',
  type: 'E',
  customer_country_code: 'AU',
  customer_state: 'QLD',
  customer_zip: '4122',
  customer_city: 'Upper Mt Gravatt',
  customer_address_line1: '777 Wanda Road',
  customer_address_line2: 'Unit 306',
  note: 'This order needs to be shipped to: Australia',
  order: [
    {
      type: 'ccb',
      quantity: '1',
      price: 23,
      due: '2022-01-21',
      desc: '120L/32 gal. CleanCUBE',
      code: 'PC-2222-22-AWBM',
      extra: {
        sticker: '3',
      },
    },
    {
      type: 'ccb2',
      quantity: '1',
      price: 12,
      due: '2022-01-28',
      desc: '120L/32 gal. CleanCUBE',
      code: '1ACAA-2288-12-C',
      extra: {},
    },
    {
      type: 'ccp',
      quantity: '1',
      price: 23,
      due: '2022-01-26',
      desc: 'CleanFLEX - ToF Sensor',
      code: 'FB2P-2GB-003',
      extra: {
        bracket: '3',
      },
    },
    {
      type: 'ttk',
      quantity: '1',
      price: 123,
      due: '2022-01-25',
      desc: 'CleanTRACK',
      code: 'T200-LS13',
      extra: {},
    },
  ],
  currency: 'AUD',
  total_price: 316,
  shipping_price: 125.6,
  vat: 5,
  charge_of_shipping: 1,
  product_status: 0,
  shipment_status: 1,
  payment_status: 0,
  order_status: 0,
  created_at: '2022-01-09T03:02:07.000Z',
  modified_at: '2022-01-26T03:02:07.000Z',
  warranty_period: 12,
  status: 'Quotation',
  balance_amount: 306,
  customer_manager_name: 'Jim',
  customer_country: 'Australia',
  customer: {
    name: 'MoongChi',
  },
  shipping: {
    shipping_method: 'Express shipping',
    delivery_terms: 'DAP',
    payment_terms: 'Within 30 days of receipt of goods',
    port_of_loading: 'Busan, South Korea',
    port_of_discharge: 'Brisbane, Australia',
    origin_country: 'South Korea',
    packaging: 'As determined by the seller',
    address_line1: '777 Wanda Road',
    address_line2: 'Unit 306',
    city: 'Upper Mt Gravatt',
    state: 'QLD',
    country_code: 'AU',
    zip: '4122',
    receiver_tel: '0412856231',
    receiver_email: 'jim@jim.com',
    receiver_name: 'Jim',
    receiver_fax: '0422565874',
    note: 'Be Gentle',
    transportation_no: '811111105910',
    pickup_date: '2021-01-30T03:02:07.000Z',
    shipping_date: '2021-01-30T03:02:07.000Z',
    arrival_date: '2022-01-20T03:02:07.000Z',
    quote: null,
    country: 'Australia',
  },
  payment: {
    export_declaration_no: null,
    customs_fees_status: 0,
    customs_fees_amount: null,
    customs_fees_date: null,
    tax_bill_date: null,
    note: 'Annual Payment',
    payment_method: 'kr',
    histories: [
      {
        idx: 1,
        amount: 10,
        date: '2022-01-27T03:02:07.000Z',
      },
    ],
  },
  manager: {
    id: 2,
    username: 'manager',
  },
  files: {
    'shipment/cipl': [
      {
        idx: 1,
        order_idx: 5,
        type: 'shipment/cipl',
        url: 'https://ecubelabs-erp.s3-us-west-2.amazonaws.com/upload/order/5/shipment/cipl/shipping_invoice.pdf',
        created_at: '2021-03-02T03:02:07.000Z',
        key: 'upload/order/1/shipment/cipl/shipping_invoice.pdf',
        version_id: 'ecssv_QM8ucQ._Mp299rcFCpjQqMhlIC',
      },
    ],
    'shipment/shipping_quote': [
      {
        idx: 2,
        order_idx: 5,
        type: 'shipment/shipping_quote',
        url: 'https://ecubelabs-erp.s3-us-west-2.amazonaws.com/upload/order/5/shipment/shipping_quote/shipping_quote.xls',
        created_at: '2021-03-02T03:02:07.000Z',
        key: 'upload/order/1/shipment/shipping_quote/shipping_quote.xls',
        version_id: '0Rwsqr0IuXxSJx6_2StIQu0GNRMbuL4A',
      },
    ],
  },
  products: [],

  update(req: InvoiceModel) {
    if (req.payment) {
      this.payment = {
        ...req.payment,
        histories: req.payment.histories.map((history, i) => {
          if (!history.date) throw new Error();
          return {
            ...history,
            idx: i + 1,
          };
        }),
      };
    }
  },
  get() {
    return selectedOrder;
  },
  reset() {
    this.idx = 5;
    this.customer_manager_idx = 1;
    this.invoice_no = 'E220124AU0010';
    this.type = 'E';
    this.customer_country_code = 'AU';
    this.customer_state = 'QLD';
    this.customer_zip = '4122';
    this.customer_city = 'Upper Mt Gravatt';
    this.customer_address_line1 = '777 Wanda Road';
    this.customer_address_line2 = 'Unit 306';
    this.note = 'This order needs to be shipped to: Australia';
    this.order = [
      {
        type: 'ccb',
        quantity: '1',
        price: 23,
        due: '2022-01-21',
        desc: '120L/32 gal. CleanCUBE',
        code: 'PC-2222-22-AWBM',
        extra: {
          sticker: '3',
        },
      },
      {
        type: 'ccb2',
        quantity: '1',
        price: 12,
        due: '2022-01-28',
        desc: '120L/32 gal. CleanCUBE',
        code: '1ACAA-2288-12-C',
        extra: {},
      },
      {
        type: 'ccp',
        quantity: '1',
        price: 23,
        due: '2022-01-26',
        desc: 'CleanFLEX - ToF Sensor',
        code: 'FB2P-2GB-003',
        extra: {
          bracket: '3',
        },
      },
      {
        type: 'ttk',
        quantity: '1',
        price: 123,
        due: '2022-01-25',
        desc: 'CleanTRACK',
        code: 'T200-LS13',
        extra: {},
      },
    ];
    this.currency = 'AUD';
    this.total_price = 316;
    this.shipping_price = 125.6;
    this.vat = 5;
    this.charge_of_shipping = 1;
    this.product_status = 0;
    this.shipment_status = 1;
    this.payment_status = 0;
    this.order_status = 0;
    this.created_at = '2022-01-09T03:02:07.000Z';
    this.modified_at = '2022-01-26T03:02:07.000Z';
    this.warranty_period = 12;
    this.status = 'Quotation';
    this.balance_amount = 306;
    this.customer_manager_name = 'Jim';
    this.customer_country = 'Australia';
    this.customer = {
      name: 'MoongChi',
    };
    this.shipping = {
      shipping_method: 'Express shipping',
      delivery_terms: 'DAP',
      payment_terms: 'Within 30 days of receipt of goods',
      port_of_loading: 'Busan, South Korea',
      port_of_discharge: 'Brisbane, Australia',
      origin_country: 'South Korea',
      packaging: 'As determined by the seller',
      address_line1: '777 Wanda Road',
      address_line2: 'Unit 306',
      city: 'Upper Mt Gravatt',
      state: 'QLD',
      country_code: 'AU',
      zip: '4122',
      receiver_tel: '0412856231',
      receiver_email: 'jim@jim.com',
      receiver_name: 'Jim',
      receiver_fax: '0422565874',
      note: 'Be Gentle',
      transportation_no: '811111105910',
      pickup_date: '2021-01-30T03:02:07.000Z',
      shipping_date: '2021-01-30T03:02:07.000Z',
      arrival_date: '2022-01-20T03:02:07.000Z',
      quote: null,
      country: 'Australia',
    };
    this.payment = {
      export_declaration_no: null,
      customs_fees_status: 0,
      customs_fees_amount: null,
      customs_fees_date: null,
      tax_bill_date: null,
      note: 'Annual Payment',
      payment_method: 'kr',
      histories: [
        {
          idx: 1,
          amount: 10,
          date: '2022-01-27T03:02:07.000Z',
        },
      ],
    };
    this.manager = {
      id: 2,
      username: 'manager',
    };
    this.files = {
      'shipment/cipl': [
        {
          idx: 1,
          order_idx: 5,
          type: 'shipment/cipl',
          url: 'https://ecubelabs-erp.s3-us-west-2.amazonaws.com/upload/order/5/shipment/cipl/shipping_invoice.pdf',
          created_at: '2021-03-02T03:02:07.000Z',
          key: 'upload/order/1/shipment/cipl/shipping_invoice.pdf',
          version_id: 'ecssv_QM8ucQ._Mp299rcFCpjQqMhlIC',
        },
      ],
      'shipment/shipping_quote': [
        {
          idx: 2,
          order_idx: 5,
          type: 'shipment/shipping_quote',
          url: 'https://ecubelabs-erp.s3-us-west-2.amazonaws.com/upload/order/5/shipment/shipping_quote/shipping_quote.xls',
          created_at: '2021-03-02T03:02:07.000Z',
          key: 'upload/order/1/shipment/shipping_quote/shipping_quote.xls',
          version_id: '0Rwsqr0IuXxSJx6_2StIQu0GNRMbuL4A',
        },
      ],
    };
    this.products = [];
  },
};
