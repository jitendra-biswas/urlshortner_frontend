import React, { useRef, useState } from "react";
import axios from "axios";

const App = () => {
  const inputRef = useRef();
  const actualURLRef = useRef();
  const copybtnRef = useRef();
  const [LoadingStatus, setLoadingStatus] = useState(false);
  const [CopyBtnText, setCopyBtnText] = useState("Copy");
  const [actualURL, setactualURL] = useState("");
  const [ShortUrl, setShortUrl] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);
    const response = await axios.post(
      "https://urlshortner-jh24.onrender.com/url",
      {
        actualURL: actualURL,
      },
    );
    setactualURL("");
    actualURLRef.current.placeholder = "https://www.example.com/very-long-url";
    setShortUrl(response.data.shortURL);
    setLoadingStatus(false);
  };

  //functiono to copy URL
  const copyURL = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(inputRef.current.value);
    setCopyBtnText("Copied");
    setTimeout(() => {
      setCopyBtnText("Copy");
    }, 800);
  };

  return (
    <>
      <div className="main w-full h-screen bg-[#eff2fe]">
        <nav className="px-25 max-md:px-10 py-5">
          <h4 className="font-bold text-[#6648fc]">URL SHORTNER</h4>
        </nav>
        <div className="container w-full flex flex-col items-center gap-5">
          <div className="intro flex flex-col items-center gap-5">
            <h4 className="font-bold max-md:text-sm text-[#6648fc] mt-5 -mb-5">
              URL SHORTNER
            </h4>
            <h1 className="text-5xl max-md:text-4xl font-bold text-[#29253d] text-center">
              Shorten links, <br />{" "}
              <span className="text-[#745cec]">share</span> anythings.
            </h1>
            <p className="text-center text-md max-md:text-sm text-[#5e5a6d] leading-6 max-md:leading-5">
              Transform long URLs into short, powerful links. <br />
              Track clicks, analyze traffic, and optimize every share.
            </p>
          </div>

          <form className="w-[60%] max-lg:w-[85%] max-md:w-[90%] bg-[#fbfaff] px-10 py-15 max-md:px-5 max-md:py-5 max-md:mt-10 flex flex-col gap-5 shadow-2xl rounded-xl">
            <p className="font-semibold text-[#29253d] -mb-3">
              Shorten a long URL
            </p>
            <div className="url w-full h-13 border-2 border-gray-200 rounded p-2 flex items-center gap-1">
              🔗
              <input
                ref={actualURLRef}
                value={actualURL}
                onChange={(e) => {
                  setactualURL(e.target.value);
                }}
                className="w-full h-full border-none outline-none"
                type="text"
                name="actualURL"
                placeholder="https://www.example.com/very-long-url"
              />
            </div>
            <button
              onClick={submitHandler}
              className="w-full h-12 bg-[#716ffc] text-white rounded font-bold cursor-pointer hover:bg-[#5856fd] active:scale-98"
            >
              { LoadingStatus ? (
                "Loading..."
              ) : (
                <>
                  Shorten URL <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
            <p className="font-semibold text-[#29253d] -mb-3">
              Your short link
            </p>
            <div className="shortURL w-full h-13 border-2 border-gray-200 rounded p-2  flex items-center gap-1">
              🔗
              <input
                ref={inputRef}
                className="w-full h-full border-none outline-none text-green-600"
                type="text"
                placeholder="https://urlshortner-jh24.onrender.com/shortURL"
                value={ShortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
              />
              <button
                onClick={copyURL}
                ref={copybtnRef}
                id="copy"
                className="flex items-center gap-1 cursor-pointer"
              >
                <i className="ri-file-copy-line"></i>
                {CopyBtnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
