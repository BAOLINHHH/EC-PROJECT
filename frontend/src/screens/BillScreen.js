import React, { useEffect } from "react";
import { Button, Card, CardHeader, CardTitle, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { formatCurrency } from "../utils/format";
import dateformat from "dateformat";
import orderApi from "../api/orderApi";
import { useState } from "react";

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
  const [transactionStatusError, setTransactionStatusError] = useState("");

  const handleUpdateOrderToPaid = async () => {
    await orderApi.updateOrderToPaid(orderId);
  };

  useEffect(() => {
    // Logic xử lý nếu cần khi trạng thái giao dịch thay đổi
    if (transactionStatus === "00") {
      handleUpdateOrderToPaid(); // Hàm xử lý cập nhật đơn hàng thành công
    } else if (transactionStatus === "07") {
      setTransactionStatusError(
        "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)."
      );
    } else if (transactionStatus === "09") {
      setTransactionStatusError(
        "Giao dịch không thành công: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng."
      );
    } else if (transactionStatus === "10") {
      setTransactionStatusError(
        "Giao dịch không thành công: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần."
      );
    } else if (transactionStatus === "11") {
      setTransactionStatusError(
        "Giao dịch không thành công: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch."
      );
    } else if (transactionStatus === "12") {
      setTransactionStatusError(
        "Giao dịch không thành công: Thẻ/Tài khoản của khách hàng bị khóa."
      );
    } else if (transactionStatus === "13") {
      setTransactionStatusError(
        "Giao dịch không thành công: Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch."
      );
    } else if (transactionStatus === "24") {
      setTransactionStatusError(
        "Giao dịch không thành công: Khách hàng hủy giao dịch."
      );
    } else if (transactionStatus === "51") {
      setTransactionStatusError(
        "Giao dịch không thành công: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch."
      );
    } else if (transactionStatus === "65") {
      setTransactionStatusError(
        "Giao dịch không thành công: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày."
      );
    } else if (transactionStatus === "75") {
      setTransactionStatusError("Ngân hàng thanh toán đang bảo trì.");
    } else if (transactionStatus === "79") {
      setTransactionStatusError(
        "Giao dịch không thành công: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch."
      );
    } else if (transactionStatus === "99") {
      setTransactionStatusError(
        "Giao dịch không thành công: Lỗi không xác định."
      );
    } else {
      setTransactionStatusError(
        "Giao dịch không thành công: Mã lỗi không xác định."
      );
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
              {transactionStatus == "00" ? (
                <>
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
                </>
              ) : (
                <>
                  <div
                    className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-white"
                      style={{ fontSize: "42px" }}
                    />
                  </div>
                </>
              )}
            </div>
            {transactionStatus == "00" ? (
              <>
                <h5 className="text-center mb-2 fw-bold">
                  Giao dịch thành công
                </h5>
              </>
            ) : (
              <>
                <h5 className="text-center mb-2 fw-bold">Giao dịch thất bại</h5>
              </>
            )}

            <p className="text-center mb-10">{transactionStatusError}</p>

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
              <Col>
                Số tiền {transactionStatus == "00" ? "được" : ""} thanh toán:
              </Col>
              <Col>{formatCurrency(amount)}</Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center text-muted d-flex justify-content-between align-items-center">
            <div>Ngày giao dịch: {formatVnpPayDate(vnpPayDate)} </div>

            {transactionStatus == "00" ? (
              <>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={handlePaymentCompletion}
                >
                  <FontAwesomeIcon icon={faArrowRight} className="me-2" />
                  Hoàn thành thanh toán
                </Button>
              </>
            ) : <></>}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default BillScreen;
