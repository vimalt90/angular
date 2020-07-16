import { RequestHeader } from "src/app/_core/model/request-header";

export class Order {
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  orderAmount: string;
  orderId?: string;
  location: string;
  header?: RequestHeader;
  signature: string;
  redirectUrl: string;
  notifyUrl: string;
  key: string;
  orderNote: string;
  hash: string;
  customerCurrency: string;
}
