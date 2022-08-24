/* eslint-disable camelcase */
export type InvoiceModel = {
  idx: number;
  customer_manager_idx: number | null;
  invoice_no: string;
  type: 'O' | 'E' | 'S' | 'A' | 'I';
  customer_country_code: string | null;
  customer_state: string | null;
  customer_zip: string | null;
  customer_city: string | null;
  customer_address_line1: string | null;
  customer_address_line2: string | null;
  note: string | null;
  order: {
    type: string;
    quantity: string;
    price: number;
    due: string;
    desc: string;
    code: string;
    extra?: {
      sticker?: string;
      bracket?: string;
    };
  }[];
  currency:
    | 'USD'
    | 'EUR'
    | 'JPY'
    | 'GBP'
    | 'AUD'
    | 'CAD'
    | 'CHF'
    | 'CNY'
    | 'SEK'
    | 'NZD'
    | 'MXN'
    | 'SGD'
    | 'HKD'
    | 'NOK'
    | 'KRW'
    | 'TRY'
    | 'RUB'
    | 'INR'
    | 'BRL'
    | 'ZAR';
  total_price: number | null;
  shipping_price: number | null;
  vat: number | null;
  charge_of_shipping: 0 | 1;
  product_status: 0 | 1;
  shipment_status: 0 | 1;
  payment_status: 0 | 1 | 2;
  order_status: 0 | 1;
  created_at: Date;
  updated_at: Date;
  warranty_period: number;
  status: 'Quotation' | 'Invoice(HQ)' | 'Invoice(US)' | 'Invoice(MKMCube OEM)';
  balance_amount: number;
  customer_manager_name: string;
  customer_country: string;
  customer: {
    name: string;
  };
  shipping: {
    shipping_method: string | null;
    delivery_terms: string | null;
    payment_terms: string | null;
    port_of_loading: string | null;
    port_of_discharge: string | null;
    origin_country: string | null;
    packaging: string | null;
    address_line1: string;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    country_code: string;
    zip: string | null;
    receiver_tel: string | null;
    receiver_email: string | null;
    receiver_name: string | null;
    receiver_fax: string | null;
    note: string | null;
    transportation_no: string | null;
    pickup_date: Date | null;
    shipping_date: Date | null;
    arrival_date: Date | null;
    quote: string | null;
    country: string | null;
  };
  payment: {
    export_declaration_no: string | null;
    customs_fees_status: number | null;
    customs_fees_amount: string | null;
    customs_fees_date: string | null;
    tax_bill_date: string | null;
    note: string | null;
    payment_method: string | null;
    histories: {
      idx?: number;
      amount?: number;
      date?: Date;
    }[];
  };
  manager: {
    id: number;
    username: string;
    email: string;
  };
  files: {};
  products: [];
};

const getInitialValue = (): InvoiceModel => ({
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
  created_at: new Date('2022-01-09'),
  updated_at: new Date('2022-01-26'),
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
    pickup_date: new Date('2021-01-30'),
    shipping_date: new Date('2021-01-30'),
    arrival_date: new Date('2022-01-20'),
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
        date: new Date('2022-01-27'),
      },
    ],
  },
  manager: {
    id: 2,
    username: 'manager',
    email: 'manager@ecubelabs.com',
  },
  files: {
    'shipment/cipl': [
      {
        idx: 1,
        order_idx: 5,
        type: 'shipment/cipl',
        url: 'https://ecubelabs-erp.s3-us-west-2.amazonaws.com/upload/order/5/shipment/cipl/shipping_invoice.pdf',
        created_at: 1642636800000,
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
        created_at: 1642636800000,
        key: 'upload/order/1/shipment/shipping_quote/shipping_quote.xls',
        version_id: '0Rwsqr0IuXxSJx6_2StIQu0GNRMbuL4A',
      },
    ],
  },
  products: [],
});

export const hooker = {
  initialValue: getInitialValue(),
  mutatedValue: getInitialValue(),
  isMutated: false,
  get() {
    if (this.isMutated) {
      this.isMutated = false;
      return this.mutatedValue;
    }
    return this.initialValue;
  },
  update(req: InvoiceModel) {
    if (req.payment) {
      this.mutatedValue.payment = {
        ...req.payment,
        histories: req.payment.histories.map((history, i) => {
          if (!history.date) throw new Error('Paid can not be empty.');
          history.idx = i + 1;
          return history;
        }),
      };
    }
    this.isMutated = true;
  },
};
