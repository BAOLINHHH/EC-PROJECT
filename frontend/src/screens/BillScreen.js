import React, { useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../utils/format";
import dateformat from "dateformat";
import orderApi from "../api/orderApi";

const BillScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  // Lấy từng giá trị của params
  const amount = searchParams.get("vnp_Amount");
  const bankCode = searchParams.get("vnp_BankCode");
  const transactionNo = searchParams.get("vnp_TransactionNo");
  const transactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnpOrderInfo = searchParams.get("vnp_OrderInfo");
  const vnpPayDate = searchParams.get("vnp_PayDate");
  const orderId = vnpOrderInfo.split(":")[1].trim(); // Lấy phần sau dấu ":"

  const handleUpdateOrderToPaid = async () => {
    await orderApi.updateOrderToPaid(orderId);
  };

  useEffect(() => {
    // Logic xử lý nếu cần khi trạng thái giao dịch thay đổi
    if (transactionStatus === "00") {
      // console.log("Transaction successful");
      handleUpdateOrderToPaid();
    } else {
      // console.log("Transaction failed");
    }
  }, [transactionStatus]);

  const formatVnpPayDate = (vnpPayDate) => {
    const dateString = `${vnpPayDate.slice(0, 4)}-${vnpPayDate.slice(
      4,
      6
    )}-${vnpPayDate.slice(6, 8)}T${vnpPayDate.slice(8, 10)}:${vnpPayDate.slice(
      10,
      12
    )}:${vnpPayDate.slice(12, 14)}`;
    return dateformat(new Date(dateString), "dd-mm-yyyy HH:MM:ss");
  };

  const handleNavigateBack = () => {
    // Điều hướng về trang trước đó hoặc một trang tùy ý
    navigate("/order-success/" + orderId);
  };

  const handlePaymentCompletion = () => {
    // Điều hướng về trang hoàn thành thanh toán hoặc trang nào đó
    navigate("/order-success/" + orderId);
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <CardHeader className="text-center text-muted d-flex justify-content-between align-items-center">
            <CardTitle>Hóa đơn thanh toán VNPAY</CardTitle>
            <Button
              variant="link"
              className="text-muted"
              onClick={handleNavigateBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Trở về
            </Button>
          </CardHeader>
          <Card.Body>
            <div className="d-flex justify-content-center mb-4">
              <div
                className="bg-success rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "80px", height: "80px" }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-white"
                  style={{ fontSize: "42px" }}
                />
              </div>
            </div>
            <h5 className="text-center mb-10 fw-bold">Giao dịch thành công</h5>

            <Row className="mb-3">
              <Col>Mã giao dịch:</Col>
              <Col>{transactionNo}</Col>
            </Row>
            <Row className="mb-3">
              <Col>Ngân hàng giao dịch:</Col>
              <Col>{bankCode}</Col>
            </Row>
            <Row className="mb-3">
              <Col>Mô tả:</Col>
              <Col>{vnpOrderInfo}</Col>
            </Row>
            <Row className="mb-3">
              <Col>Số tiền được thanh toán:</Col>
              <Col>{formatCurrency(amount)}</Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center text-muted d-flex justify-content-between align-items-center">
            <div>Ngày giao dịch: {formatVnpPayDate(vnpPayDate)} </div>

            <Button
              variant="link"
              className="text-primary"
              onClick={handlePaymentCompletion}
            >
              <FontAwesomeIcon icon={faArrowRight} className="me-2" />
              Hoàn thành thanh toán
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default BillScreen;
