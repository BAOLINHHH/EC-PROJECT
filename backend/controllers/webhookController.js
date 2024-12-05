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
  }
  if (intentName === "Cuốn sách {any} do ai sáng tác ?") {
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
          fulfillmentText: `Xin lỗi, tôi không tìm thấy thông tin về cuốn sách "${any}". Có thể bạn cần nhập chính xác tên sách`,
        };
        res.json(response);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sách:", error);
      let response = {
        fulfillmentText:
          "Xin lỗi tôi chưa giải quyết được câu hỏi của bạn. Vui lòng đặt câu hỏi lại sau.",
      };
      res.json(response);
    }
  } else if (intentName === "Các quyển sách nào đang bán chạy vậy?") {
    try {
      // Lấy 5 quyển sách bán chạy nhất từ cơ sở dữ liệu (sắp xếp theo rating hoặc bán chạy)
      const topRatedBooks = await Product.find()
        .sort({ rating: -1 })  // Sắp xếp theo rating cao nhất (hoặc có thể thay bằng số lượng bán)
        .limit(5)  // Lấy 5 sách
        .populate("category")
        .populate("author")
        .populate("form")
        .populate("publicCompany")
        .populate("language");

      if (topRatedBooks.length > 0) {
        // Tạo phản hồi với danh sách các sách
        let responseText = "Dưới đây là 5 quyển sách bán chạy nhất:\n";
        topRatedBooks.forEach((book, index) => {
          responseText += `${index + 1}. "${book.bookName}" - Tác giả: ${book.author} | Đánh giá: ${book.rating}\n`;
        });

        let response = {
          fulfillmentText: responseText,
        };
        res.json(response);
      } else {
        let response = {
          fulfillmentText: "Xin lỗi, không có sách nào bán chạy tại thời điểm này.",
        };
        res.json(response);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sách bán chạy:", error);
      let response = {
        fulfillmentText: "Xin lỗi, tôi gặp vấn đề khi lấy thông tin sách bán chạy. Vui lòng thử lại sau.",
      };
      res.json(response);
    }
  } else {
    res.json({ fulfillmentText: "Intent không được xử lý trong webhook này." });
  }
};

export { handleWebhook };
