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
import { hooker, InvoiceModel } from './data.mock';
import InvoiceDetailScreen from './InvoiceDetailScreen';

type ArgTypes = ComponentProps<typeof InvoiceDetailScreen>;

const wrapper: DecoratorFn = (storyFn) => {
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
      selectedOrder: hooker.initialValue,
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
          ...hooker.initialValue,
        },
      },
    },
  };
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));
  return (
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
};

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
          return res(ctx.status(200), ctx.json(hooker.get()));
        }),
        getAccountManagers: rest.get(`${BASE_URL_V3}/account-managers`, (req, res, ctx) =>
          res(
            ctx.status(200),
            ctx.json([{ email: 'manager@ecubelabs.com', id: 2, username: 'manager', leftAt: null }]),
          ),
        ),
        getUserGroups: rest.get(`${BASE_URL_V3}/groups`, (req, res, ctx) => res(ctx.status(200), ctx.json([]))),
        getProductTypes: rest.get(`${BASE_URL}/user/product-types`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json({ all: true, data: [] })),
        ),
        modifyInvoice: rest.put(`${BASE_URL}/order/5`, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(hooker.update(req.body as InvoiceModel))),
        ),
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
    children: <Shipment />,
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
    children: <Payment />,
  },
};

export const PaymentAddPaymentHistory: StoryObj<ArgTypes> = {
  ...PaymentDefault,
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    const edit = await canvas.findByRole('button', { name: 'Edit' });
    await fireEvent.click(edit);

    const addPaymentHistory = await canvas.findByRole('button', { name: 'Add payment history' });
    await fireEvent.click(addPaymentHistory);

    const [, addedPaidAmountInput] = await canvas.findAllByRole('textbox', { name: 'Paid amount:' });
    await fireEvent.change(addedPaidAmountInput, {
      target: { value: '20.50' },
    });
    await expect(addedPaidAmountInput).toHaveValue('20.50');

    const [, addedPaidDateInput] = await canvas.findAllByLabelText('Date:');
    await fireEvent.change(addedPaidDateInput, {
      target: { value: '2022-01-28' },
    });
    await expect(addedPaidDateInput).toHaveValue('2022-01-28');

    const save = await canvas.findByRole('button', { name: 'Save' });
    await fireEvent.click(save);
    await expect(save).toHaveProperty('disabled', true);

    const widgetToaster = await canvas.findByRole('alertdialog');
    await expect(widgetToaster).toHaveTextContent('Setting successfully saved!');
    await expect(edit).toHaveProperty('disabled', false);
    await expect(addedPaidAmountInput).toHaveValue('20.50');
    await expect(addedPaidDateInput).toHaveValue('2022-01-28');

    // FIXME: redux도 함께 바뀌면 금액까지 명시
    await expect(await canvas.findByText('Balance:', { exact: false })).toBeTruthy();
  },
};

export const PaymentUpdatePaymentHistory: StoryObj<ArgTypes> = {
  ...PaymentDefault,
  play: async (context) => {
    const { canvasElement } = context;
    const canvas = within(canvasElement);

    const edit = await canvas.findByRole('button', { name: 'Edit' });
    await fireEvent.click(edit);

    // NOTE:배열이지만 1개의 요소 밖에  없어서 findAllByRole 보다 빠른 findByRole를 사용
    const selectedPaidAmountInput = await canvas.findByRole('textbox', {
      name: 'Paid amount:',
    });
    await expect(selectedPaidAmountInput).toHaveValue('10.00');
    await fireEvent.change(selectedPaidAmountInput, {
      target: { value: '22.50' },
    });
    await expect(selectedPaidAmountInput).toHaveValue('22.50');

    const selectedPaidDateInput = await canvas.findByLabelText('Date:');
    await expect(selectedPaidDateInput).toHaveValue('2022-01-27');
    await fireEvent.change(selectedPaidDateInput, {
      target: { value: '2022-02-01' },
    });
    await expect(selectedPaidDateInput).toHaveValue('2022-02-01');

    const save = await canvas.findByRole('button', { name: 'Save' });
    await fireEvent.click(save);
    await expect(save).toHaveProperty('disabled', true);

    const widgetToaster = await canvas.findByRole('alertdialog');
    await expect(widgetToaster).toHaveTextContent('Setting successfully saved!');
    await expect(edit).toHaveProperty('disabled', false);
    await expect(selectedPaidAmountInput).toHaveValue('22.50');
    await expect(selectedPaidDateInput).toHaveValue('2022-02-01');

    // FIXME: redux도 함께 바뀌면 금액까지 명시
    await expect(await canvas.findByText('Balance:', { exact: false })).toBeTruthy();
  },
};
