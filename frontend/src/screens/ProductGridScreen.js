import React, { useEffect, useMemo ,useState} from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Product from "../componets/Product";
import Loader from "../componets/Loader";
import Message from "../componets/Message";
import { useParams,useNavigate, useSearchParams,useLocation } from "react-router-dom";
import Paginate from "../componets/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";
const ProductGridScreen = () => {
  const {pageNumber,keyword,category,publicCompany,minPrice,maxPrice,form} = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  const [selectedCompany, setSelectedCompany] = useState(null)
  const [searchParams] = useSearchParams()
  // const keywordParam = searchParams.get("keyword")||'';  
  const [colorCategory, setColorCategory] = useState(null);
  // const categoryParam = searchParams.get("category")||'';

  // const publicCompanyParam = searchParams.get("publicCompany")||'';
  // const pageParam = searchParams.get("pageNumber")||'';
  // const minPriceParam = searchParams.get("minPrice")||'';
  // const maxPriceParam = searchParams.get("maxPrice")||'';
  // const formParam = searchParams.get("form")||'';


  // const[minPriceState, setMinPriceState] = useState('')
  // const[maxPriceState, setMaxPriceState]= useState('')
  const queryParams = new URLSearchParams(location.search)
  // const [keywordParam, setKeywordParam] = useState(queryParams.get("keyword")|| "") 
  const currentCategoryParam = queryParams.get("category") || "";
  const currentPublicCompanyParam = queryParams.get("publicCompany") || "";
  
  const keywordParam = searchParams.get("keyword")||''; 
  const [categoryParam, setCategoryParam] = useState(currentCategoryParam)
  const [publicCompanyParam, setPublicCompanyParam] = useState(currentPublicCompanyParam)
  // const { data: products, isLoading, error } = useGetProductsQuery({keyword: (keyword || keywordParam),
  // pageNumber: (pageNumber||pageParam),category:(category||categoryParam),publicCompany:(publicCompany||publicCompanyParam),minPrice:(minPrice||minPriceParam),maxPrice:(maxPrice||maxPriceParam),form:(form||formParam)});
  const { data: products, isLoading, error } = useGetProductsQuery({keyword:(keyword||keywordParam),publicCompany:(publicCompany||publicCompanyParam),
   category:(category||categoryParam)});

  useEffect(()=>{
    // queryParams.set("keyword",keywordParam);
    
    // queryParams.set("category",categoryParam);
    //navigate({search: queryParams.toString()})

    if (currentCategoryParam !== categoryParam||currentPublicCompanyParam !== publicCompanyParam) {
      setCategoryParam(currentCategoryParam);
      setPublicCompanyParam(currentPublicCompanyParam);
    }
  },[currentPublicCompanyParam,publicCompanyParam,currentCategoryParam,categoryParam,queryParams]);
 
  
  const arrcategories = [
    'Tất cả các sách',
    'Tiểu Thuyết',
    'Văn Học',
    'Thiếu Nhi',
    'Kinh Tế',
    'Ngôn Tình',
    'Tâm Lí',
    "Manga",
]
const arrPublicCompany = [
  'NXB Kim Đồng',
  'NXB Hội Nhà Văn',
  'IPM',
  'AZ Việt Nam',
  'Nhã Nam',
  'Trẻ',
  'Dân Trí',
]
const arrForm = [
  'Bìa Cứng',
  'Bìa Mềm',
  'Bộ Hộp',
]

const setCategoryValue = (categoryValue) => {
    setColorCategory(categoryValue)
    if(categoryValue==='Tất cả các sách')
        categoryValue=''
    queryParams.set("category", categoryValue);
    navigate({ search: queryParams.toString() });
    // navigate(`/all-product?keyword=${keywordParam}&category=${categoryValue}&pageNumber=${pageParam}&publicCompany=${publicCompanyParam}&minPrice=${minPriceParam}&maxPrice=${maxPriceParam}`);
  
  };
  const handleCheckboxChange = (company)=>{
  const publicCompany = company===selectedCompany ? '': company
  setSelectedCompany(publicCompany)
  queryParams.set("publicCompany", company);
  navigate({ search: queryParams.toString() });
}
// const [selectedCompany, setSelectedCompany] = useState(null)
// const [selectedForm, setSelectedForm] = useState(null)
// const handleCheckboxChange = (company)=>{
//   const publicCompany = company===selectedCompany ? '': company
//   setSelectedCompany(publicCompany)
//   navigate(`/all-product?publicCompany=${publicCompany}`);
// }
// const handleCheckboxFormChange = (formMap)=>{
//   const form = formMap === selectedForm ? '' : formMap
//   setSelectedForm(form)
//   navigate(`/all-product?form=${form}`);
// }
// const categoryParams = new URLSearchParams('?category=${category}');
// const [categoryValue,setcategory] = useState(categoryParams.get("category"));


// const setCategoryValue = (categoryValue) => {
//   // setColorCategory(categoryValue)
//   if(categoryValue==='Tất cả các sách')
//       categoryValue=''
      
//   navigate(`/all-product?keyword=${keywordParam}&category=${categoryValue}&pageNumber=${pageParam}&publicCompany=${publicCompanyParam}&minPrice=${minPriceParam}&maxPrice=${maxPriceParam}`);
// };
// const submitPrie =(e)=>{
//   e.preventDefault();
//   navigate(`/all-product?minPrice=${minPriceState}&maxPrice=${maxPriceState}`);
// }
// const ResetPrice = () => {
//     setMinPriceState('')
//     setMaxPriceState('')
//     navigate(`/all-product?minPrice=${minPriceState}&maxPrice=${maxPriceState}`);
// }

// const setCategorys = (category) => {
//   if (category) {
//     navigate(`/all-product/filter/${category.trim()}`);
//   } else {
//     navigate('/');
//   }
// };
  const pages = useMemo(() => {
    if (!products) return 0;
    
    if(products.pages)
       return products.pages 

  }, [products,]);
  const page = useMemo(() => {
    if (!products) return 0;
         
    if(products.page)
    return products.page
  }, [products]);

  
  return (
    <>
      <section className="list-products py-5 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <button
                className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>Hiển thị bộ lọc</span>
              </button>

              <div
                className="collapse card d-lg-block mb-5"
                id="navbarSupportedContent"
              >
                <div className="accordion" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseOne"
                      >
                        Thể Loại
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          
                        {arrcategories.map(categoryMap => (
                          
                          <li
              
                                style={{
                                cursor: 'pointer',
                                 listStyleType: 'none',
                                 color: colorCategory===categoryMap? 'blue' : 'black'
                                }}
                                onClick={() => setCategoryValue(categoryMap)}
                                >
                               {categoryMap}
                              
                              
                            </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo"
                      >
                        Nhà xuất bản
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseTwo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingTwo"
                    >
                      <div className="accordion-body">
                        <div>
                        {arrPublicCompany.map(company =>(


                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value={publicCompanyParam} checked={company===selectedCompany} onChange={()=>handleCheckboxChange(company)} />
                          <label class="form-check-label" for="flexCheckDefault">
                          {company}
                          </label>
                        </div>
                        
                        ))} 
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree"
                      >
                        Giá
                      </button>
                    </h2>
                    {/* <form onSubmit={submitPrie}>
                    <div
                      id="panelsStayOpen-collapseThree"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div className="row mb-3">
                          <div className="col-6">
                            <p className="mb-0">Nhỏ</p>
                            <div className="form-outline">
                              <input
                                type="number"
                                value={minPriceState}
                                className="form-control"
                                onChange={(e)=>setMinPriceState(e.target.value)}
                              />
                              <label className="form-label" for="typeNumber">
                                0 VND
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <p className="mb-0">Lớn</p>
                            <div className="form-outline">
                              <input
                                type="number"
                                value={maxPriceState}
                                onChange={(e)=>setMaxPriceState(e.target.value)}
                                className="form-control"
                              />
                              <label className="form-label" for="typeNumber">
                                500,0000 VND
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-outline-warning"
                          >
                            Chọn
                          </button>

                          <button type="button" className="btn btn-outline-secondary"  onClick={ResetPrice}>
                          Đạt lại giá tiền
                          </button>
                          
                        </div>
                      </div>
                    </div>
                    </form> */}
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFour"
                      >
                        Hình thức
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFour"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div>
                            {/* {arrForm.map(formMap =>(


                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value={formMap} checked={formMap===selectedForm} onChange={()=>handleCheckboxFormChange(formMap)} />
                              <label class="form-check-label" for="flexCheckDefault">
                              {formMap}
                              </label>
                            </div>

                            ))}  */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpens-collapseFour"
                        aria-expanded="false"
                        aria-controls="panelsStayOpens-collapseFour"
                      >
                        Hình thức
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpens-collapseFour"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefaultform1"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefaultform1"
                            >
                              Tiếng anh
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefaultform2"
                            />
                            <label
                              className="form-check-label"
                              for="flexRadioDefaultform2"
                            >
                              Tiếng việt
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button text-dark bg-light"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseFive"
                        aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseFive"
                      >
                        Đánh giá
                      </button>
                    </h2>
                    <div
                      id="panelsStayOpen-collapseFive"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingThree"
                    >
                      <div className="accordion-body">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefaultrating1"
                          />
                          <label
                            className="form-check-label rating"
                            for="flexRadioDefaultrating1"
                          >
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefaultrating2"
                          />
                          <label
                            className="form-check-label rating"
                            for="flexRadioDefaultrating2"
                          >
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefaultrating3"
                          />
                          <label
                            className="form-check-label rating"
                            for="flexRadioDefaultrating3"
                          >
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefaultrating4"
                          />
                          <label
                            className="form-check-label rating"
                            for="flexRadioDefaultrating4"
                          >
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefaultrating5"
                          />
                          <label
                            className="form-check-label rating"
                            for="flexRadioDefaultrating5"
                          >
                            <span>
                              <FaStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                            <span>
                              <FaRegStar />
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              ) : (
                <>
                  <div className="product-card row row-cols-4">
                    {products.products && products.products.map((product) => (
                      <Product product={product} />
                    ))}
                  </div>
                </>
              )}
              <div className="d-flex justify-content-center mt-3">
            <Paginate pages={pages} page={page}/>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductGridScreen;
