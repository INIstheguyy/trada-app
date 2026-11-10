// @vitest-environment jsdom
import { afterEach, expect, test } from 'vitest';
import { store } from '../app/store';
import { sessionEstablished, signedOut } from '../features/auth/authSlice';
import { api } from '../lib/api';
import { DEMO_ACCESS_TOKEN, DEMO_REFRESH_TOKEN, demoUser } from './demoApi';

afterEach(() => {
  store.dispatch(signedOut());
  store.dispatch(api.util.resetApiState());
});

test('serves schema-valid product and sales data to a demo session', async () => {
  store.dispatch(
    sessionEstablished({
      accessToken: DEMO_ACCESS_TOKEN,
      refreshToken: DEMO_REFRESH_TOKEN,
      user: demoUser,
    }),
  );

  const products = await store.dispatch(api.endpoints.getProducts.initiate()).unwrap();
  const analytics = await store.dispatch(api.endpoints.getSalesAnalytics.initiate()).unwrap();

  expect(products.products.length).toBeGreaterThan(0);
  expect(products.pagination.total).toBe(products.products.length);
  expect(analytics.totalSalesCount).toBeGreaterThan(0);
  expect(analytics.totalRevenue).toBeGreaterThan(analytics.unpaidBalance);
});
