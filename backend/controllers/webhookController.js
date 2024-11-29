// @desc    POST webhook handleWebhook
// @route   POST /webhook/handleWebhook
// @access  Private
const handleWebhook = async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  if (intentName === "MyCustomIntent") {
    // Truy cập database và lấy thông tin cần thiết
    console.log("req.body.queryResult", req.body.queryResult);

    let response = {
      fulfillmentText: "Dữ liệu của bạn đây",
    };
    res.json(response);
  }
  else if (intentName === "Cuốn sách abc có nội dung thế nào ?") {
    // 
    console.log("req.body.queryResult", req.body.queryResult);

    let response = {
      fulfillmentText: "Cuốn sách rất hay",
    };
    res.json(response);
  } else {
    res.json({ fulfillmentText: "Intent không được xử lý trong webhook này." });
  }
};

export { handleWebhook };