import Product from "../models/productModel.js";

// @desc    POST webhook handleWebhook
// @route   POST /webhook/handleWebhook
// @access  Private
const handleWebhook = async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  const any = req.body.queryResult.parameters.any;

  if (intentName === "MyCustomIntent") {
    // Truy cập database và lấy thông tin cần thiết
    console.log("req.body.queryResult", req.body.queryResult.parameters.any);

    let response = {
      fulfillmentText: "Dữ liệu của bạn đây",
    };
    res.json(response);
  } else if (intentName === "Cuốn sách abc có nội dung thế nào ?") {
    let response = {
      fulfillmentText: "Cuốn sách " + any + " rất hay.",
    };
    res.json(response);
  } else if (intentName === "Cuốn sách {any} do ai sáng tác ?") {
    try {
      // Tìm kiếm sách theo tên
      const book = await Product.findOne({ bookName: any }).select(
        "author bookName"
      );

      if (book) {
        let response = {
          fulfillmentText: `Cuốn sách "${book.bookName}" được sáng tác bởi tác giả "${book.author}".`,
        };
        res.json(response);
      } else {
        let response = {
          fulfillmentText: `Xin lỗi, tôi không tìm thấy thông tin về cuốn sách "${any}".`,
        };
        res.json(response);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sách:", error);
      let response = {
        fulfillmentText:
          "Xin lỗi tôi giải quyết được câu hỏi của bạn. Vui lòng đặt câu hỏi lại sau.",
      };
      res.json(response);
    }
  } else {
    res.json({ fulfillmentText: "Intent không được xử lý trong webhook này." });
  }
};

export { handleWebhook };
