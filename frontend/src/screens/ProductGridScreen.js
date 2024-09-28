import React, { useEffect, useMemo ,useState} from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom"
import Rating from '@mui/material/Rating';
import {BsCart ,BsSuitHeart,BsEye  } from 'react-icons/bs';

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
 
  const { data: items, isLoading, error } = useGetProductsQuery({keyword: keywordParam ,pageNumber: pageNumberParam, category: categoryParam,publicCompany: publicCompanyParam,
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
  
  // const arrCategories =[];
  // for(let i = 0;  i<items.products.length; i++){
  //     arrCategories.push(items.products[i].category)
  // }
  // const fitterArrCategory = [...new Set(arrCategories)]
  const arrcategories = [
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
// const fiveStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>];
const fourStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaStar/>,<FaRegStar/>];
const threeStar = [ <FaStar/>,<FaStar/>,<FaStar/>,<FaRegStar/>,<FaRegStar/>];
const twotar = [ <FaStar/>,<FaStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>];
const oneStar = [ <FaStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>,<FaRegStar/>];
const arrStarRate = [
{name: '5',star: <Rating value={5} readOnly />}, {name: '4',star: <Rating value={4} readOnly />},{ name: '3', star: <Rating value={3} readOnly />}, {name: '2', star: <Rating value={2} readOnly />}, {name: '1', star: <Rating value={1} readOnly />}
]
 const validateValueMin = (value) => {
  setMinPriceParam(value);
 }
 const validateValueMax = (value) => {
  setMaxPriceParam(value);
 }
const setCategoryValue = (categoryValue) => {
    setColorCategory(categoryValue);
    if(categoryValue==='Tất cả các sách'){
        categoryValue='';
    }
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
    if (!items) return 0;
    
    if(items.pages)
       return items.pages 

  }, [items,]);
  const page = useMemo(() => {
    if (!items) return 0;
         
    if(items.page)
    return items.page
  }, [items]);

  
  return (
    <>
      <section className="my-8 ">
        <div className="container-sm">
          <div className="row">
            <div className="col-lg-3">
              <div>
                <div>
                  <div>
                    <h4 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2">
                      Thể Loại
                    </h4>
                    <h4 className="font-normal text-[#444] capitalize leading-[1] cursor-pointer mb-2"
                      style={{
                        color: colorCategory==='Tất cả các sách' ? '#ff6162' : 'black',
                        }}
                    onClick={() => setCategoryValue('Tất cả các sách')}>
                      Tất cả các loại sách
                    </h4>
                  </div>
                  <ul className="pl-[10px]">   
                    {arrcategories.map(categoryMap => (      
                      <li className="max-w-[100px] flex justify-center "
                        style={{
                        cursor: 'pointer',
                        listStyleType: 'none',
                        color: colorCategory===categoryMap ? '#fff' : 'black',
                        border: colorCategory===categoryMap ? '1px solid black': '',
                        borderRadius: colorCategory===categoryMap ? '30px': '',
                        backgroundColor: colorCategory===categoryMap ? '#ff6162' : ''
                        }}
                        onClick={() => setCategoryValue(categoryMap)}
                        >
                        {categoryMap}
                      </li>
                    ))}
                  </ul>
                </div>
                  <div>
                    <div>
                      <h2 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2">
                        Nhà xuất bản
                      </h2>
                    </div>
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
                  <div >
                    <div>
                      <h2 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2" >
                        Giá
                      </h2>
                    </div>
                    {/* lan 2 <form onSubmit={submitPrie}> */}
                      <div >
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
                    
                    {/* lan 2</form> */}
                  </div>
                 <div>
                    <div>
                      <h2 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2">
                        Hình thức
                      </h2>
                    </div>
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
                  <div>
                    <h2 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2" >
                        Hình thức
                    </h2>   
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
                  <div>
                    <h2 className="text-[20px] font-semibold text-[#444] capitalize leading-[1] mb-2">
                        Đánh giá
                    </h2>
                    <div>
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
            <div className="col-lg-9">
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  {error?.data?.message || error.error}
                </Message>
              ) : (
                <>
                  <div className="flex flex-wrap w-full gap-4">
                    {items.products && items.products.map((product) => (
                      <div className="w-[31.6%]">
                      <div className=" card h-[430px]  group ">
                          <div className="flex justify-center relative">
                              <Link to={ `/product/${product._id}`}>
                              <img className="max-h-[210px] w-[210px]" src={product.bookImage}/>
                              </Link>
                          </div>
                          <span className=" text-[#eee] left-[8px] top-[8px] border-[1px] border-solid rounded-[5px] bg-red-500 p-[4px] absolute ">25%</span>
                          <span className=" text-[#eee] top-[45px] left-[8px] border-[1px] border-solid rounded-[5px] bg-[#eeb900] p-[4px] absolute ">New</span>
                          <div className="flex flex-row justify-center opacity-0 group-hover:!opacity-[1]  transition-all ease-in-out duration-[0.3s] group-hover:-translate-y-1  items-center">
                                  <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center" > < BsSuitHeart /> </button>
                                  <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsEye /> </button>
                                  <button className=" mx-2 h-[30px] w-[30px] bg-[#fff] border-[1px] border-solid rounded-[5px] border-[#eee] flex justify-center items-center"><BsCart /> </button>
                          </div>
                          <div className=" card-body border-t-[1px] ">
                                  <h6 className="font-normal text-[#999] text-[14px] mb-[10px] leading-[1.2] capitalize">Tieu Thuyet</h6>
                                  <Link to={`product/${product._id}`}>
                                  <h2 className="font-normal text-[17px] h-[70px] pt-2  line-clamp-2 mb-[10px] leading-[28px] text-[#4b5966] capitalize hover:text-[#5caf90]">
                                  {product.bookName}
                                  </h2>
                                  </Link>
                                  <Rating name="half-rating-read mb-[10px]" defaultValue={product.rating} precision={0.5} readOnly />
                              <div> 
                                  <span className="text-[#4b5966] text-[18px] font-bold mr-[7px]">{product.bookPrice}</span>
                                  <span className="text-[14px] text-[#777] line-through mr-[7px]">7500</span>
                                  
                              </div>             
                          </div>
                      </div>
                    </div>
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
