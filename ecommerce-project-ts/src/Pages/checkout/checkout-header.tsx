import "./checkout-header.css";
import type { PaymentSummaryData } from "../../types";

interface CheckoutHeaderProps {
  paymentSummary: PaymentSummaryData | null;
}

function CheckoutHeader({ paymentSummary }: CheckoutHeaderProps) {
    return (
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="/images/logo.png" />
              <img className="mobile-logo" src="/images/mobile-logo.png" />
            </a>
          </div>
          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {paymentSummary?.totalItems ?? 0} items{" "}
            </a>
            )
          </div>
          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    );
    }
export default CheckoutHeader;
