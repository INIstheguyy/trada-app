````
\# Trada Backend API - Complete Request & Response Documentation
This document contains full endpoint specifications, headers, request bodies, qu
ery parameters, and JSON responses for all frontend client integrations.
**Base URL**: `http://localhost:3002/api/v1` (replace with your staging/production domain)
**Content-Type**: `application/json`
**Authorization**: `Bearer <access_token>`
---
## Table of Contents
1. [Authentication (`/auth`)](#1-authentication-auth)
- [1.1 Register User](#11-register-user)
- [1.2 Login User](#12-login-user)
- [1.3 Refresh Access Token](#13-refresh-access-token)
- [1.4 Get Profile (Me)](#14-get-profile-me)
2. [Products (`/products`)](#2-products-products)
- [2.1 Create Product](#21-create-product)
- [2.2 List Products (Filter & Pagination)](#22-list-products-filter--paginat
ion)
- [2.3 Get Low-Stock Alerts](#23-get-low-stock-alerts)
- [2.4 Get Single Product](#24-get-single-product)
- [2.5 Update Product](#25-update-product)
- [2.6 Delete Product](#26-delete-product)
3. [Sales (`/sales`)](#3-sales-sales)
- [3.1 Record a Sale (Cart Checkout)](#31-record-a-sale-cart-checkout)
- [3.2 List Sales (Search & Filter)](#32-list-sales-search--filter)
- [3.3 Get Single Sale Detail](#33-get-single-sale-detail)
- [3.4 Cancel Sale & Restock Inventory](#34-cancel-sale--restock-inventory)
- [3.5 Sales Analytics & Profit Report](#35-sales-analytics--profit-report)
4. [Standard Error Responses](#4-standard-error-responses)
5. [Enums Reference](#5-enums-reference)
---
## 1. Authentication (`/auth`)
### 1.1 Register User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/register`
- **Headers**: `Content-Type: application/json`
- **Auth Required**: No
#### Request Body
```json
{
"firstName": "John",
"lastName": "Doe",
"email": "johndoe@example.com",
"phoneNumber": "08012345678",
"password": "Password123"
}
````

#### Response (`201 Created`) ```json {

"success": true, "message": "User registered successfully", "data": {

```


```

"id": "e5c6a1b2-1234-4567-89ab-cdef01234567",
"firstName": "John",
"lastName": "Doe",
"email": "johndoe@example.com",
"role": "user",
"isActive": true,
"createdAt": "2026-11-04T12:00:00.000Z",
"updatedAt": "2026-11-04T12:00:00.000Z"
}
}

````
---
### 1.2 Login User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/login`
- **Headers**: `Content-Type: application/json`
- **Auth Required**: No
#### Request Body
```json
{
"email": "johndoe@example.com",
"password": "Password123"
}
````

#### Response (`200 OK`)

```json
{
"success": true,
"message": "Login successful",
"data": {
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YzZhMWIyLTE
yMzQtNDU2Ny04OWFiLWNkZWYwMTIzNDU2NyIsImlhdCI6MTc5Mzc4Njc4OX0...",
"refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU1YzZhMWIyLT
EyMzQtNDU2Ny04OWFiLWNkZWYwMTIzNDU2NyIsImlhdCI6MTc5Mzc4Njc4OX0...",
"user": {
"id": "e5c6a1b2-1234-4567-89ab-cdef01234567",
"firstName": "John",
"lastName": "Doe",
"email": "johndoe@example.com"
}
}
}
```

---

### 1.3 Refresh Access Token

- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/refresh`
- **Headers**: `Content-Type: application/json`
- **Auth Required**: No

#### Request Body

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

```


```

\#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newAccessTokenHere..."
  }
}
```

---

### 1.4 Get Profile (Me)

- **Method**: `GET`
- **Endpoint**: `/api/v1/auth/me`
- **Headers**:
- `Authorization: Bearer <access_token>`

#### Response (`200 OK`)

```json
{
  "success": true,
  "data": {
    "id": "e5c6a1b2-1234-4567-89ab-cdef01234567",
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "08012345678",
    "role": "user",
    "isActive": true,
    "createdAt": "2026-11-04T12:00:00.000Z",
    "updatedAt": "2026-11-04T12:00:00.000Z"
  }
}
```

---

## 2. Products (`/products`)

### 2.1 Create Product

- **Method**: `POST`
- **Endpoint**: `/api/v1/products`
- **Headers**:
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

> **Note**: `businessId` is optional. If not provided, it automatically links to
> the business owned by the authenticated user.

#### Request Body

```json
{
"name": "Golden Penny Semovita 2kg",
"description": "Premium wheat semovita 2kg pack",
"type": "inventory_based",
"category": "Foodstuff",
"unit": "pack",
"quantity": 50,
"stockThreshold": 10,
```

```
"costPrice": 2800,
"sellingPrice": 3400,
"discountPrice": 3200,
"condition": "new",
"location": "Aisle 3, Shelf B",
"sku": "SEMO-2KG-GP",
"barcode": "8901234567890",
"isActive": true
}
```

#### Response (`201 Created`)

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "7d9e4a3b-9876-4321-ba98-fedcba098765",
    "name": "Golden Penny Semovita 2kg",
    "description": "Premium wheat semovita 2kg pack",
    "type": "inventory_based",
    "category": "Foodstuff",
    "unit": "pack",
    "quantity": 50,
    "stockThreshold": 10,
    "costPrice": 2800,
    "sellingPrice": 3400,
    "discountPrice": 3200,
    "condition": "new",
    "location": "Aisle 3, Shelf B",
    "sku": "SEMO-2KG-GP",
    "barcode": "8901234567890",
    "isActive": true,
    "businessId": "b1348e3a-4411-4777-a066-cd171ab66e77",
    "createdById": "e5c6a1b2-1234-4567-89ab-cdef01234567",
    "createdAt": "2026-11-04T12:15:00.000Z",
    "updatedAt": "2026-11-04T12:15:00.000Z"
  }
}
```

---

### 2.2 List Products (Filter & Pagination)

- **Method**: `GET`
- **Endpoint**: `/api/v1/products`
- **Headers**: `Authorization: Bearer <access_token>`

#### Query Parameters

| Parameter   | Type    | Default     | Description                                  |
| ----------- | ------- | ----------- | -------------------------------------------- |
| `search`    | string  | -           | Searches name, sku, barcode, description     |
| `category`  | string  | -           | Filter by category                           |
| `type`      | string  | -           | `inventory_based` or `input_based`           |
| `condition` | string  | -           | `new`, `used`, or `foreign_used`             |
| `isActive`  | boolean | -           | `true` or `false`                            |
| `minPrice`  | number  | -           | Minimum selling price                        |
| `maxPrice`  | number  | -           | Maximum selling price                        |
| `page`      | number  | `1`         | Current page                                 |
| `limit`     | number  | `10`        | Items per page (max: 100)                    |
| `sortBy`    | string  | `createdAt` | `createdAt`, `name`, `sellingPrice`, `quanti |
| ty`         |

```


```

| `sortOrder` | string | `DESC` | `ASC` or `DESC` |

#### Example Request

`GET /api/v1/products?search=semo&page=1&limit=10&sortBy=sellingPrice&sortOrder=
ASC`

#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": "7d9e4a3b-9876-4321-ba98-fedcba098765",
      "name": "Golden Penny Semovita 2kg",
      "type": "inventory_based",
      "category": "Foodstuff",
      "unit": "pack",
      "quantity": 50,
      "stockThreshold": 10,
      "costPrice": 2800,
      "sellingPrice": 3400,
      "discountPrice": 3200,
      "condition": "new",
      "location": "Aisle 3, Shelf B",
      "sku": "SEMO-2KG-GP",
      "barcode": "8901234567890",
      "isActive": true,
      "businessId": "b1348e3a-4411-4777-a066-cd171ab66e77"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

### 2.3 Get Low-Stock Alerts

- **Method**: `GET`
- **Endpoint**: `/api/v1/products/alerts/low-stock`
- **Headers**: `Authorization: Bearer <access_token>`

#### Response (`200 OK`)

```json
{
"success": true,
"message": "Low stock products fetched successfully",
"data": [
{
"id": "7d9e4a3b-9876-4321-ba98-fedcba098765",
"name": "Golden Penny Semovita 2kg",
"quantity": 8,
"stockThreshold": 10,
"unit": "pack",
"location": "Aisle 3, Shelf B"
```

```
}
]
}
```

---

### 2.4 Get Single Product

- **Method**: `GET`
- **Endpoint**: `/api/v1/products/:id`
- **Headers**: `Authorization: Bearer <access_token>`

#### Response (`200 OK`)

```json
{
  "success": true,
  "data": {
    "id": "7d9e4a3b-9876-4321-ba98-fedcba098765",
    "name": "Golden Penny Semovita 2kg",
    "description": "Premium wheat semovita 2kg pack",
    "type": "inventory_based",
    "category": "Foodstuff",
    "unit": "pack",
    "quantity": 50,
    "stockThreshold": 10,
    "costPrice": 2800,
    "sellingPrice": 3400,
    "condition": "new",
    "location": "Aisle 3, Shelf B",
    "sku": "SEMO-2KG-GP",
    "isActive": true
  }
}
```

---

### 2.5 Update Product

- **Method**: `PUT` or `PATCH`
- **Endpoint**: `/api/v1/products/:id`
- **Headers**:
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

#### Request Body (Provide only the fields to update)

```json
{
  "sellingPrice": 3600,
  "quantity": 45,
  "stockThreshold": 15
}
```

#### Response (`200 OK`)

```json
{
"success": true,
"message": "Product updated successfully",
"data": {
"id": "7d9e4a3b-9876-4321-ba98-fedcba098765",
"name": "Golden Penny Semovita 2kg",
"sellingPrice": 3600,
```

```
"quantity": 45,
"stockThreshold": 15,
"updatedAt": "2026-11-04T12:25:00.000Z"
}
}
```

---

### 2.6 Delete Product

- **Method**: `DELETE`
- **Endpoint**: `/api/v1/products/:id`
- **Headers**: `Authorization: Bearer <access_token>`

#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 3. Sales (`/sales`)

### 3.1 Record a Sale (Cart Checkout)

- **Method**: `POST`
- **Endpoint**: `/api/v1/sales`
- **Headers**:
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

> **Behavior**:
>
> - Executes within an atomic database transaction.
> - Automatically validates product existence and stock availability.
> - Automatically deducts `quantity` from `Product.quantity` for `inventory_base
d` items.
> - Automatically snapshots product name, cost price, SKU, and unit price into `
SaleItem`.

#### Request Body

```json
{
  "customerName": "Alice Johnson",
  "customerPhone": "08023456789",
  "customerEmail": "alice@example.com",
  "paymentMethod": "pos",
  "amountPaid": 6800,
  "discountAmount": 0,
  "taxAmount": 0,
  "notes": "Paid via Main POS Terminal",
  "items": [
    {
      "productId": "7d9e4a3b-9876-4321-ba98-fedcba098765",
      "quantity": 2,
      "unitPrice": 3400,
      "discountAmount": 0
    }
  ]
}
```

```


```

\#### Response (`201 Created`)

```json
{
  "success": true,
  "message": "Sale recorded successfully",
  "data": {
    "id": "9a8b7c6d-5432-10fe-dcba-9876543210fe",
    "receiptNumber": "REC-20261104-631892",
    "customerName": "Alice Johnson",
    "customerPhone": "08023456789",
    "customerEmail": "alice@example.com",
    "subtotal": 6800,
    "discountAmount": 0,
    "taxAmount": 0,
    "totalAmount": 6800,
    "amountPaid": 6800,
    "balanceDue": 0,
    "paymentMethod": "pos",
    "paymentStatus": "paid",
    "status": "completed",
    "notes": "Paid via Main POS Terminal",
    "items": [
      {
        "id": "3f2e1d0c-1122-3344-5566-778899aabbcc",
        "productId": "7d9e4a3b-9876-4321-ba98-fedcba098765",
        "productName": "Golden Penny Semovita 2kg",
        "sku": "SEMO-2KG-GP",
        "costPrice": 2800,
        "unitPrice": 3400,
        "quantity": 2,
        "subtotal": 6800,
        "discountAmount": 0,
        "total": 6800
      }
    ],
    "createdAt": "2026-11-04T12:30:00.000Z",
    "updatedAt": "2026-11-04T12:30:00.000Z"
  }
}
```

---

### 3.2 List Sales (Search & Filter)

- **Method**: `GET`
- **Endpoint**: `/api/v1/sales`
- **Headers**: `Authorization: Bearer <access_token>`

#### Query Parameters

| Parameter       | Type   | Default | Description                                            |
| --------------- | ------ | ------- | ------------------------------------------------------ |
| `search`        | string | -       | Searches receipt number, customer name, customer phone |
|                 |
| `paymentMethod` | string | -       | `cash`, `pos`, `transfer`, `credit`, `split`           |
| `paymentStatus` | string | -       | `paid`, `partially_paid`, `unpaid`, `refunded`         |
|                 |
| `status`        | string | -       | `completed`, `pending`, `cancelled`, `refunded`        |
| `startDate`     | string | -       | e.g. `2026-11-01`                                      |
| `endDate`       | string | -       | e.g. `2026-11-30`                                      |
| `page`          | number | `1`     | Current page                                           |
| `limit`         | number | `10`    | Items per page (max: 100)                              |

```


```

| `sortBy` | string | `createdAt` | `createdAt`, `totalAmount`, `receiptNumber`
|
| `sortOrder` | string | `DESC` | `ASC` or `DESC` |

#### Example Request

`GET /api/v1/sales?paymentStatus=paid&startDate=2026-11-01&page=1&limit=10`

#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Sales fetched successfully",
  "data": [
    {
      "id": "9a8b7c6d-5432-10fe-dcba-9876543210fe",
      "receiptNumber": "REC-20261104-631892",
      "customerName": "Alice Johnson",
      "customerPhone": "08023456789",
      "subtotal": 6800,
      "discountAmount": 0,
      "taxAmount": 0,
      "totalAmount": 6800,
      "amountPaid": 6800,
      "balanceDue": 0,
      "paymentMethod": "pos",
      "paymentStatus": "paid",
      "status": "completed",
      "items": [
        {
          "id": "3f2e1d0c-1122-3344-5566-778899aabbcc",
          "productName": "Golden Penny Semovita 2kg",
          "quantity": 2,
          "unitPrice": 3400,
          "total": 6800
        }
      ],
      "createdAt": "2026-11-04T12:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```

---

### 3.3 Get Single Sale Detail

- **Method**: `GET`
- **Endpoint**: `/api/v1/sales/:id`
- **Headers**: `Authorization: Bearer <access_token>`

#### Response (`200 OK`)

```json
{
"success": true,
"data": {
```

```
"id": "9a8b7c6d-5432-10fe-dcba-9876543210fe",
"receiptNumber": "REC-20261104-631892",
"customerName": "Alice Johnson",
"customerPhone": "08023456789",
"customerEmail": "alice@example.com",
"subtotal": 6800,
"discountAmount": 0,
"taxAmount": 0,
"totalAmount": 6800,
"amountPaid": 6800,
"balanceDue": 0,
"paymentMethod": "pos",
"paymentStatus": "paid",
"status": "completed",
"notes": "Paid via Main POS Terminal",
"items": [
{
"id": "3f2e1d0c-1122-3344-5566-778899aabbcc",
"productId": "7d9e4a3b-9876-4321-ba98-fedcba098765",
"productName": "Golden Penny Semovita 2kg",
"sku": "SEMO-2KG-GP",
"costPrice": 2800,
"unitPrice": 3400,
"quantity": 2,
"subtotal": 6800,
"discountAmount": 0,
"total": 6800
}
],
"createdAt": "2026-11-04T12:30:00.000Z"
}
}
```

---

### 3.4 Cancel Sale & Restock Inventory

- **Method**: `POST`
- **Endpoint**: `/api/v1/sales/:id/cancel`
- **Headers**: `Authorization: Bearer <access_token>`

> **Behavior**: Cancels the sale, marks `paymentStatus` as `refunded`, and autom
> atically restores the purchased quantities back to the products in inventory.

#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Sale cancelled and stock restored successfully",
  "data": {
    "id": "9a8b7c6d-5432-10fe-dcba-9876543210fe",
    "receiptNumber": "REC-20261104-631892",
    "status": "cancelled",
    "paymentStatus": "refunded",
    "totalAmount": 6800
  }
}
```

---

### 3.5 Sales Analytics & Profit Report

```


```

\- **Method**: `GET`

- **Endpoint**: `/api/v1/sales/reports/analytics`
- **Headers**: `Authorization: Bearer <access_token>`

#### Query Parameters

- `startDate` _(string, optional)_: e.g. `2026-11-01`
- `endDate` _(string, optional)_: e.g. `2026-11-30`

#### Example Request

`GET /api/v1/sales/reports/analytics?startDate=2026-11-01&endDate=2026-11-30`

#### Response (`200 OK`)

```json
{
  "success": true,
  "message": "Sales analytics fetched successfully",
  "data": {
    "totalSalesCount": 142,
    "totalRevenue": 4850000,
    "totalCost": 3400000,
    "grossProfit": 1450000,
    "totalDiscount": 45000,
    "totalTax": 0,
    "unpaidBalance": 120000
  }
}
```

---

## 4. Standard Error Responses

Whenever a request fails, the API responds with a standard error JSON format:

### Insufficient Stock (`400 Bad Request`):

```json
{
"success": false,
"message": "Insufficient stock for 'Golden Penny Semovita 2kg'. Available: 1,
Requested: 5"
}
```

### Missing or Expired Token (`401 Unauthorized`): ```json {

"success": false, "message": "Access token required. Format: Bearer <token>"
}

````
### Duplicate SKU (`400 Bad Request`):
```json
{
"success": false,
"message": "Product with SKU 'SEMO-2KG-GP' already exists in this business"
}
````

### Resource Not Found (`404 Not Found`):

```json
{
```

```
"success": false,
"message": "Sale not found"
}
```

---

## 5. Enums Reference

### Product Enums:

- **`ProductType`**:
- `"inventory_based"` (tracks quantity and deducts on sales)
- `"input_based"` (raw materials or services)
- **`ProductCondition`**:
- `"new"`
- `"used"`
- `"foreign_used"`

### Sales Enums:

- **`PaymentMethod`**:
- `"cash"`
- `"pos"`
- `"transfer"`
- `"credit"`
- `"split"`
- **`PaymentStatus`**:
- `"paid"`
- `"partially_paid"`
- `"unpaid"`
- `"refunded"`
- **`SaleStatus`**:
- `"completed"`
- `"pending"`
- `"cancelled"`
- `"refunded"`

```

```
