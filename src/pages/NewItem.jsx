import { addNewProduct } from "api/firebase";
import { uploadImg } from "api/uploader";
import { toast } from "react-toastify";
import React, { useState } from "react";

export default function NewItem() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  console.log("product", product);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    console.log("files", files);
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImg(file)
      .then((url) => {
        addNewProduct(product, url).then((result) =>
          toast.success("성공적으로 등록하였습니다.", { autoClose: 2000 })
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("상품을 등록하는데 오류가 발생하였습니다.");
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <div className="h-screen">
      <div className="w-full flex justify-center items-center p-2">
        <h2 className="font-semibold">새로운 제품 등록</h2>
      </div>
      <section className="flex justify-center p-2 h-screen">
        <article className="w-full max-w-screen-xl flex justify-center flex-wrap">
          <div className="md:h-11/12 h-2/3 lg:w-2/6 md:w-3/6 w-full bg-gray-300 flex justify-center">
            {!file && (
              <div className="absolute font-semibold text-zinc-600">
                제품 이미지를 업로드 해주세요 🙆‍♀️
              </div>
            )}
            {file && (
              <img
                className="h-full w-full"
                id="imagePreview"
                src={URL.createObjectURL(file)}
                title="newProduct"
                alt="newProduct"
              />
            )}
          </div>
          <div className="flex flex-col xl:w-3/6 md:w-full w-11/12 h-2/3 xl:relative xl:top-16 p-2">
            <form className="lg:space-y-10 grid gap-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept="image/*"
                  name="file"
                  required
                  onChange={handleChange}
                />
              </div>
              {/* title  제품명 */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  제품명
                </label>
              </div>
              {/* price 가격 */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  가격
                </label>
              </div>
              {/* description 설명 */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={handleChange}
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  설명
                </label>
              </div>
              {/* 성별 */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="gender"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    성별
                  </label>
                </div>
                {/* options(옵션들(콤마(,)f로 구분)*/}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="options"
                    id="options"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="options"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    옵션
                  </label>
                </div>
              </div>
              {/* 제품 등록하기 */}
              <button
                type="submit"
                onSubmit={handleSubmit}
                disabled={isUploading ? true : false}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-slate-500"
              >
                등록하기
              </button>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}
