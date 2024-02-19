import React, { useEffect, useMemo ,useState} from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Product from "../componets/Product";
import Loader from "../componets/Loader";
import Message from "../componets/Message";
import {useNavigate, useSearchParams } from "react-router-dom";
import Paginate from "../componets/Paginate";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import CurrencyInput from 'react-currency-input-field';
const ProductGridScreen = () => {
  const navigate = useNavigate();


  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedForm, setSelectedForm] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedRate, setSelectedRate]= useState(null)
  const [searchParams] = useSearchParams()
  const [colorCategory, setColorCategory] = useState(null);
  
  const currentCategoryParam = searchParams.get("category") || "";
  const currentPublicCompanyParam = searchParams.get("publicCompany") || "";
  const currentPageNumberParam = searchParams.get('pageNumber')||'';
  const keywordParam = searchParams.get("keyword")||''; 
  const currentMinPrice = searchParams.get("minPrice")||'';
  const currentMaxPrice = searchParams.get("maxPrice")||'';
  const currentform = searchParams.get("form")||'';
  const currentLanguage = searchParams.get('language')||'';
  const currentRate = searchParams.get('rate')|| '';



  const [categoryParam, setCategoryParam] = useState(currentCategoryParam)
  const [publicCompanyParam, setPublicCompanyParam] = useState(currentPublicCompanyParam)
  const [pageNumberParam, setPageNumberParam] = useState(currentPageNumberParam)
  const [minPriceParam,setMinPriceParam] = useState(currentMinPrice);
  const [maxPriceParam,setMaxPriceParam] = useState(currentMaxPrice);
  const [formParam, setFormParam] = useState(currentform);
  const [ languageParam,setLanguageParam] = useState(currentLanguage);
  const [ rateParam, setRateParam] = useState(currentRate)
 
  const { data: products, isLoading, error } = useGetProductsQuery({keyword: keywordParam ,pageNumber: pageNumberParam, category: categoryParam,publicCompany: publicCompanyParam,
    minPrice: minPriceParam, maxPrice: maxPriceParam, form: formParam, language: languageParam, rate: rateParam });

  useEffect(()=>{ 

    if (currentCategoryParam !== categoryParam||currentPublicCompanyParam !== publicCompanyParam||currentPageNumberParam!==pageNumberParam||currentform !==formParam || currentLanguage !== languageParam ||currentRate !==rateParam) {
      setCategoryParam(currentCategoryParam);
      setPublicCompanyParam(currentPublicCompanyParam);
      setPageNumberParam(currentPageNumberParam);
      setFormParam(currentform);
      setLanguageParam(currentLanguage);
      setRateParam(currentRate);
    }
  },[currentPageNumberParam,pageNumberParam,currentPublicCompanyParam,publicCompanyParam,currentCategoryParam,categoryParam,currentform,formParam,currentLanguage,languageParam,currentRate,rateParam]);
 

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
const arrLanguage = [ 
  'Tiếng Việt',
  'Tiếng Anh',
  'Tiếng Trung',
]
const fiveStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>];
const fourStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>,<FaRegStar/>];
const threeStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaRegStar/>,<FaRegStar/>];
const twotar = [ <FaStar/>,<FaStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>];
const oneStar = [ <FaStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>];
const arrStarRate = [
{name: '5',star: fiveStar}, {name: '4',star: fourStar},{ name: '3', star: threeStar}, {name: '2', star: twotar}, {name: '1', star: oneStar}
]
 const validateValueMin = (value) => {
  setMinPriceParam(value);
 }
 const validateValueMax = (value) => {
  setMaxPriceParam(value);
 }
const setCategoryValue = (categoryValue) => {
    setColorCategory(categoryValue);
    if(categoryValue==='Tất cả các sách')
        categoryValue='';
    searchParams.set("category", categoryValue);
    navigate({ search: searchParams.toString() });
  };
  const handleCheckboxFormChange = (formMap)=>{
  const formcheck = formMap === selectedForm ? '': formMap
  setSelectedForm(formcheck)
  searchParams.set("form", formcheck);
  navigate({ search: searchParams.toString() });
}


  const handleCheckboxChange = (company)=>{
  const publicCompany = company===selectedCompany ? '': company
  setSelectedCompany(publicCompany);
  searchParams.set("publicCompany", publicCompany);
  navigate({ search: searchParams.toString() });
};

const handleCheckboxLanguageChange= (languageArr) =>{
  const languageFunction = languageArr === selectedLanguage ? '': languageArr
  setSelectedLanguage(languageFunction);
  searchParams.set('language', languageFunction);
  navigate({ search: searchParams.toString() });
};
const handleCheckboxStarChange = (value) => {
const rateFunction = value === selectedRate ? '': value
setSelectedRate(rateFunction);
searchParams.set('rate', rateFunction);
navigate({ search: searchParams.toString()});
};

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
                                 color: colorCategory===categoryMap ? 'blue' : 'black'
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
                    {/* <form onSubmit={submitPrie}> */}
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
                              <CurrencyInput    
                                allowDecimals={false}
                                defaultValue={minPriceParam}
                                className="form-control"
                                onValueChange={validateValueMin}

                                // onChange={(e)=>setMinPriceParam(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <p className="mb-0">Lớn</p>
                            <div className="form-outline">
                              <CurrencyInput
                                allowDecimals={false}
                                defaultValue={maxPriceParam}
                                onValueChange={validateValueMax}
                                // onChange={(e)=>setMaxPriceParam(e.target.value)}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      
                      </div>
                    </div>
                    {/* </form> */}
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
                            {arrForm.map(formMap =>(


                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value={formMap} checked={formMap===selectedForm} onChange={()=>handleCheckboxFormChange(formMap)} />
                              <label class="form-check-label" for="flexCheckDefault">
                              {formMap}
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
                            {arrLanguage.map(languageMap=>(
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value={languageMap} checked={languageMap===selectedLanguage} onChange={()=>handleCheckboxLanguageChange(languageMap)} />
                              <label class="form-check-label" for="flexCheckDefault">
                              {languageMap}
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
                      <div>
                            {arrStarRate.map(starRate=>(
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value={rateParam} checked={starRate.name ===selectedRate} onChange={()=>handleCheckboxStarChange(starRate.name)} />
                              <label class="form-check-label rating " for="flexCheckDefault">
                              <span>{starRate.star}</span>
                              </label>
                            </div>
                            ))} 
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
