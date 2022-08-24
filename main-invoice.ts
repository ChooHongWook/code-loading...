import React, { ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { DecoratorFn, Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within, fireEvent } from '@storybook/testing-library';
import { jsxDecorator } from 'storybook-addon-jsx';
import { InjectedRouter } from 'react-router';
import { Action } from 'history';
import rootReducer from '../../reducers';
import { AuthProvider } from '../../libs/auth';
import { BASE_URL, BASE_URL_V3 } from '../../config/constant';
import Invoice from '../../containers/Sales/Order/OrderDetailSections/Invoice';
import Manufacture from '../../containers/Sales/Order/OrderDetailSections/Manufacture';
import Shipment from '../../containers/Sales/Order/OrderDetailSections/Shipment';
import Payment from '../../containers/Sales/Order/OrderDetailSections/Payment';
import { InvoiceModel } from '../../models';
import { selectedOrder } from './data.mock';
import InvoiceDetailScreen from './InvoiceDetailScreen';

const initialState = {
  user: {
    mySelf: {
      email: 'sw@ecubelabs.com',
      username: 'admin',
      id: 1,
      timezone: 9,
      zone: 'Asia/Seoul',
      groupTypes: [],
      partner: {
        ccnIdx: null,
      },
      joinedAt: '1970-01-01T00:00:00.000Z',
      iat: 1626863167,
      exp: 1627467967,
    },
    isAuthenticated: true,
  },
  sales: {
    selectedOrder,
  },
  UI: {
    loadingMainContainer: false,
  },
  routing: {
    locationBeforeTransitions: {
      pathname: 'invoice',
    },
  },
  itemList: {
    itemListType: '',
  },
  form: {
    InvoiceForm: {
      values: {
        ...selectedOrder,
      },
    },
  },
};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));

type ArgTypes = ComponentProps<typeof InvoiceDetailScreen>;

const wrapper: DecoratorFn = (storyFn) => (
  <Provider store={store as any}>
    <AuthProvider
      user={{
        id: 1,
        email: 'sw@ecubelabs.com',
        name: 'admin',
        enName: 'admin',
        username: 'admin',
        zone: 'Asia/Seoul',
        timezone: 9,
        groupIdx: 4,
        groupTypes: [],
        jobTitle: 'Admin',
        joinedAt: new Date('1970-01-01T00:00:00.000Z'),
        division: '',
        tel: '',
      }}
    >
      <div style={{ backgroundColor: 'white' }}>{storyFn()}</div>
    </AuthProvider>
  </Provider>
);

export default {
  title: 'screens/InvoiceDetailScreen',
  component: InvoiceDetailScreen,
  decorators: [jsxDecorator, wrapper],
  args: {
    params: { idx: 5 },
    router: [] as unknown as InjectedRouter,
  },
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: {
        getCustomerSemantic: rest.get(`${BASE_URL}/customer/semantic`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json({})),
        ),
        getInvoice: rest.get(`${BASE_URL_V3}/invoices/:invoiceId`, (req, res, ctx) => {
          const response = res(ctx.status(200), ctx.json(selectedOrder.get()));
          selectedOrder.reset();
          return response;
        }),
        getAccountManagers: rest.get(`${BASE_URL_V3}/account-managers`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json([{ email: 'manager@ecubelabs.com', id: 2, username: 'manager', leftAt: null }]),
          ),
        ),
        getProductTypes: rest.get(`${BASE_URL}/user/product-types`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json({ all: true, data: [] })),
        ),
        modifyInvoice: rest.patch(`${BASE_URL}/order/5`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(selectedOrder.update(req.body as InvoiceModel)));
        }),
        updateInvoice: rest.patch(`${BASE_URL_V3}/invoices/5`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(selectedOrder.update(req.body as InvoiceModel)));
        }),
        uploadAttachment: rest.post(`${BASE_URL}/order/attachFile`, (req, res, ctx) =>
          res(ctx.status(201), ctx.json([])),
        ),
        deleteAttachment: rest.delete(`${BASE_URL_V3}/invoices/:invoiceId/files?fileIds=:fileId`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json({})),
        ),
      },
    },
  },
} as Meta<ArgTypes>;

export const InvoiceDefault: StoryObj<ArgTypes> = {
  args: {
    location: {
      pathname: '/sales/order/5/invoice',
      search: '',
      query: { page: 1 },
      hash: '',
      state: {},
      action: '' as Action,
      key: '',
    },
    routes: [{ path: 'invoice', component: undefined }],
    children: <Invoice />,
  },
};

export const InvoiceAddProduct: StoryObj<ArgTypes> = {
  ...InvoiceDefault,
  parameters: {
    msw: {
      handlers: {
        // TODO: invoice update v3 로 변경 후 제거
        modifyInvoice: rest.put(`${BASE_URL}/order/5`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(selectedOrder.update(req.body as InvoiceModel)));
        }),
      },
    },
  },
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    const edit = await canvas.findByText('Edit');
    await fireEvent.click(edit);

    const addProduct = await canvas.findByText('Add Product');
    await fireEvent.click(addProduct);

    const adjacencyProductCodeLabels = await canvas.findAllByText('Product Code:');
    await fireEvent.change(adjacencyProductCodeLabels[4].parentElement!.childNodes[1].childNodes[0], {
      target: { value: 'ABC123' },
    });

    const adjacencyQuantityLabels = await canvas.findAllByText('Quantity:');
    await fireEvent.change(adjacencyQuantityLabels[4].parentElement!.childNodes[1].childNodes[0], {
      target: { value: '1' },
    });

    const adjacencyPriceLabels = await canvas.findAllByText('Price (per unit):');
    await fireEvent.change(adjacencyPriceLabels[4].parentElement!.childNodes[1].childNodes[0], {
      target: { value: '10.00' },
    });

    const save = await canvas.findByText('Save');
    await fireEvent.click(save);
    await expect(save).toHaveProperty('disabled', true);
  },
};

export const InvoiceDeleteProduct: StoryObj<ArgTypes> = {
  ...InvoiceDefault,
  parameters: {
    msw: {
      handlers: {
        // TODO: invoice update v3 로 변경 후 제거
        modifyInvoice: rest.put(`${BASE_URL}/order/5`, (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(selectedOrder.update(req.body as InvoiceModel)));
        }),
      },
    },
  },
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    const edit = await canvas.findByText('Edit');
    await fireEvent.click(edit);

    const buttons = await canvas.findAllByRole('button');
    await fireEvent.click(buttons[3]);

    const save = await canvas.findByText('Save');
    await fireEvent.click(save);
    await expect(save).toHaveProperty('disabled', true);
  },
};

export const ManufactureDefault: StoryObj<ArgTypes> = {
  args: {
    location: {
      pathname: '/sales/order/5/manufacture',
      search: '',
      query: { page: 1 },
      hash: '',
      state: {},
      action: '' as Action,
      key: '',
    },
    routes: [{ path: 'manufacture', component: undefined }],
    children: <Manufacture />,
  },
};

export const ShipmentDefault: StoryObj<ArgTypes> = {
  args: {
    location: {
      pathname: '/sales/order/5/shipment',
      search: '',
      query: { page: 1 },
      hash: '',
      state: {},
      action: '' as Action,
      key: '',
    },
    routes: [{ path: 'shipment', component: undefined }],
    children: <Shipment invoice={selectedOrder.get()} isLoading={false} />,
  },
};

export const PaymentDefault: StoryObj<ArgTypes> = {
  args: {
    location: {
      pathname: '/sales/order/5/payment',
      search: '',
      query: { page: 1 },
      hash: '',
      state: {},
      action: '' as Action,
      key: '',
    },
    routes: [{ path: 'payment', component: undefined }],
    children: <Payment invoice={selectedOrder.get()} isLoading={false} />,
  },
};

export const PaymentAddPaymentHistory: StoryObj<ArgTypes> = {
  ...PaymentDefault,
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    const edit = await canvas.findByText('Edit');
    await fireEvent.click(edit);

    const addPaymentHistory = await canvas.findByText('Add payment history');
    await fireEvent.click(addPaymentHistory);

    const [, addedPaidAmountInput] = await canvas.findAllByRole('textbox', { name: 'Paid amount:' });
    await fireEvent.change(addedPaidAmountInput, {
      target: { value: '20.50' },
    });

    const [, addedPaidDateInput] = await canvas.findAllByLabelText('Date:');
    await fireEvent.change(addedPaidDateInput, {
      target: { value: '2022-01-28' },
    });

    const save = await canvas.findByText('Save');
    await fireEvent.click(save);
    await expect(save).toHaveProperty('disabled', true);
    // FIXME: redux도 함께 바뀌면 금액까지 명시
    await expect(await canvas.findByText('Balance:', { exact: false })).toBeTruthy();
  },
};
