// @desc    POST webhook handleWebhook
// @route   POST /webhook/handleWebhook
// @access  Private
const handleWebhook = async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;

  if (intentName === "MyCustomIntent") {
    // Truy cập database và lấy thông tin cần thiết
    console.log("req.body.queryResult", req.body.queryResult.parameters.any);

    let response = {
      fulfillmentText: "Dữ liệu của bạn đây",
    };
    res.json(response);
  }
  else if (intentName === "Cuốn sách abc có nội dung thế nào ?") {
    // 
    const any = req.body.queryResult.parameters.any;
    console.log("Tên quyển sách: ", any);

    let response = {
      fulfillmentText: "Cuốn sách " + any + " rất hay.",
    };
    res.json(response);
  } else {
    res.json({ fulfillmentText: "Intent không được xử lý trong webhook này." });
  }
};

export { handleWebhook };